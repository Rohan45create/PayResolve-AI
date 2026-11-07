import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';

// ─── Types ───────────────────────────────────────────────────────────────────

type SigStatus = 'Verified' | 'Unverified';
type ProcStatus = 'Processed' | 'Failed' | 'Duplicate' | 'Received';

interface WebhookEvent {
  eventId: string;
  type: string;
  resource: string;
  signature: SigStatus;
  status: ProcStatus;
  tries: number;
  at: string;
  rawPayload: string;
  attempts: { label: string; note: string; variant: 'error' | 'info' | 'success' }[];
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_EVENTS: WebhookEvent[] = [
  {
    eventId: 'evt-8841',
    type: 'PAYMENT.CAPTURE.COMPLETED',
    resource: 'capture 8XK',
    signature: 'Verified',
    status: 'Failed',
    tries: 2,
    at: '10:02:41',
    rawPayload:
      '{"event_type":"PAYMENT.CAPTURE.COMPLETED","resource":{"id":"8XK","status":"COMPLETED","amount":{"value":"84.50","currency_code":"USD"},"custom_id":"10482"}}',
    attempts: [
      { label: 'Attempt 1', note: 'failed — handler error', variant: 'error' },
      { label: 'Attempt 2', note: 'duplicate, no effect', variant: 'info' },
    ],
  },
  {
    eventId: 'evt-8841',
    type: 'PAYMENT.CAPTURE.COMPLETED',
    resource: 'capture 8XK',
    signature: 'Verified',
    status: 'Duplicate',
    tries: 1,
    at: '10:02:56',
    rawPayload:
      '{"event_type":"PAYMENT.CAPTURE.COMPLETED","resource":{"id":"8XK","status":"COMPLETED","amount":{"value":"84.50","currency_code":"USD"},"custom_id":"10482"}}',
    attempts: [
      { label: 'Attempt 1', note: 'duplicate detected — skipped', variant: 'info' },
    ],
  },
  {
    eventId: 'evt-8837',
    type: 'PAYMENT.CAPTURE.COMPLETED',
    resource: 'capture 4TM',
    signature: 'Verified',
    status: 'Processed',
    tries: 1,
    at: '09:58:03',
    rawPayload:
      '{"event_type":"PAYMENT.CAPTURE.COMPLETED","resource":{"id":"4TM","status":"COMPLETED","amount":{"value":"32.00","currency_code":"USD"},"custom_id":"10477"}}',
    attempts: [
      { label: 'Attempt 1', note: 'handler succeeded', variant: 'success' },
    ],
  },
  {
    eventId: 'evt-8830',
    type: 'PAYMENT.CAPTURE.REFUNDED',
    resource: 'refund 2QD',
    signature: 'Verified',
    status: 'Processed',
    tries: 1,
    at: '09:41:20',
    rawPayload:
      '{"event_type":"PAYMENT.CAPTURE.REFUNDED","resource":{"id":"2QD","status":"COMPLETED","amount":{"value":"18.00","currency_code":"USD"},"custom_id":"10470"}}',
    attempts: [
      { label: 'Attempt 1', note: 'handler succeeded', variant: 'success' },
    ],
  },
  {
    eventId: 'evt-8826',
    type: 'CHECKOUT.ORDER.APPROVED',
    resource: 'order 6HJ',
    signature: 'Verified',
    status: 'Received',
    tries: 0,
    at: '09:40:02',
    rawPayload:
      '{"event_type":"CHECKOUT.ORDER.APPROVED","resource":{"id":"6HJ","status":"APPROVED","purchase_units":[{"amount":{"value":"120.00","currency_code":"USD"}}],"custom_id":"10466"}}',
    attempts: [],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig: Record<ProcStatus, { label: string; classes: string }> = {
  Processed: { label: 'Processed', classes: 'border-emerald-400 text-emerald-700 bg-emerald-50' },
  Failed:    { label: 'Failed',    classes: 'border-rose-400 text-rose-700 bg-rose-50' },
  Duplicate: { label: 'Duplicate', classes: 'border-slate-400 text-slate-600 bg-slate-50' },
  Received:  { label: 'Received',  classes: 'border-amber-400 text-amber-700 bg-amber-50' },
};

const sigConfig: Record<SigStatus, string> = {
  Verified:   'border-emerald-400 text-emerald-700 bg-emerald-50',
  Unverified: 'border-rose-400 text-rose-700 bg-rose-50',
};

function StatusPill({ status }: { status: ProcStatus }) {
  const { label, classes } = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-semibold ${classes}`}>
      {label}
    </span>
  );
}

function SigPill({ sig }: { sig: SigStatus }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-semibold ${sigConfig[sig]}`}>
      {sig}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EventInboxPage() {
  const [events, setEvents] = useState<WebhookEvent[]>(SEED_EVENTS);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const kpi = {
    received: events.length + 209,
    verified: events.filter((e) => e.signature === 'Verified').length + 209,
    processed: events.filter((e) => e.status === 'Processed').length + 205,
    failedOrDup: events.filter((e) => e.status === 'Failed' || e.status === 'Duplicate').length + 5,
  };

  const selected = events[selectedIdx];

  const handleSampleData = () => {
    setEvents(SEED_EVENTS);
    setSelectedIdx(0);
  };

  const handleReplay = () => {
    if (!selected) return;
    // Simulate a replay: reset status to Received with tries = 0
    setEvents((prev) =>
      prev.map((e, i) =>
        i === selectedIdx
          ? { ...e, status: 'Received', tries: 0, attempts: [], at: new Date().toTimeString().slice(0, 8) }
          : e
      )
    );
  };

  return (
    <AppLayout>
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Event inbox</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Every PayPal webhook, stored raw before it is processed.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSampleData}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
          >
            Sample data
          </button>
          <button
            onClick={handleReplay}
            className="px-3.5 py-1.5 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white text-xs font-semibold shadow-sm cursor-pointer"
          >
            Replay event
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Received',          value: kpi.received },
          { label: 'Verified',          value: kpi.verified },
          { label: 'Processed',         value: kpi.processed },
          { label: 'Failed or duplicate', value: kpi.failedOrDup },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
          </div>
        ))}
      </div>

      {/* ── Main Split ── */}
      <div className="flex gap-5 items-start">
        {/* Left: event table */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-semibold">
                <th className="text-left px-4 py-3">Event</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Resource</th>
                <th className="text-left px-4 py-3">Signature</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Tries</th>
                <th className="text-left px-4 py-3">At</th>
              </tr>
            </thead>
            <tbody>
              {events.map((evt, i) => (
                <tr
                  key={`${evt.eventId}-${i}`}
                  onClick={() => setSelectedIdx(i)}
                  className={`border-b border-slate-50 cursor-pointer transition-colors ${
                    selectedIdx === i ? 'bg-blue-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="px-4 py-3 font-mono font-bold text-slate-800">{evt.eventId}</td>
                  <td className="px-4 py-3 text-slate-700 font-mono">{evt.type}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono">{evt.resource}</td>
                  <td className="px-4 py-3">
                    <SigPill sig={evt.signature} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={evt.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-center">{evt.tries}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono">{evt.at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: detail panel */}
        {selected && (
          <div className="w-80 shrink-0 bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div>
              <p className="text-sm font-bold text-slate-900">{selected.eventId}</p>
              <p className="text-xs text-slate-500 mt-0.5">Raw payload and processing log</p>
            </div>

            {/* Raw JSON */}
            <pre className="bg-[#f0f4f9] rounded-lg p-3 text-[10px] font-mono text-slate-700 leading-relaxed overflow-x-auto whitespace-pre-wrap break-all border border-slate-100">
              {selected.rawPayload}
            </pre>

            {/* Attempt log */}
            {selected.attempts.length > 0 ? (
              <div className="space-y-2">
                {selected.attempts.map((a, ai) => (
                  <div key={ai}>
                    <span
                      className={`text-xs font-bold ${
                        a.variant === 'error'
                          ? 'text-rose-600'
                          : a.variant === 'success'
                          ? 'text-emerald-600'
                          : 'text-slate-600'
                      }`}
                    >
                      {a.label}
                    </span>{' '}
                    <span className="text-xs text-slate-500">{a.note}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No processing attempts yet.</p>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
