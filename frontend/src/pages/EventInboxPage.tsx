import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';

interface WebhookEvent {
  eventId: string;
  type: string;
  resource: string;
  signature: 'Verified' | 'Unverified';
  status: 'Processed' | 'Failed' | 'Duplicate' | 'Received';
  tries: number;
  at: string;
  rawPayload: string;
  attempts: { label: string; statusText: string; isError?: boolean }[];
}

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
      { label: 'Attempt 1', statusText: 'failed handler error', isError: true },
      { label: 'Attempt 2', statusText: 'duplicate, no effect', isError: false },
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
      { label: 'Attempt 1', statusText: 'duplicate, no effect', isError: false },
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
      { label: 'Attempt 1', statusText: 'handler succeeded', isError: false },
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
      { label: 'Attempt 1', statusText: 'handler succeeded', isError: false },
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
      '{"event_type":"CHECKOUT.ORDER.APPROVED","resource":{"id":"6HJ","status":"APPROVED","intent":"CAPTURE"}}',
    attempts: [
      { label: 'Attempt 1', statusText: 'enqueued for processing', isError: false },
    ],
  },
];

export default function EventInboxPage() {
  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent>(SEED_EVENTS[0]);

  const handleReplay = () => {
    alert(`Replaying ${selectedEvent.eventId}: dispatched to idempotency-aware webhook receiver.`);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Event inbox
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Every PayPal webhook, stored raw before it is processed.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Sample event stream fixture reloaded.')}
              className="px-4 py-2 rounded-lg bg-white dark:bg-[#131b26] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer shadow-2xs"
            >
              Sample data
            </button>
            <button
              onClick={handleReplay}
              className="px-4 py-2 rounded-lg bg-white dark:bg-[#131b26] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer shadow-2xs"
            >
              Replay event
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Received</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">214</div>
          </div>
          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Verified</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">214</div>
          </div>
          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Processed</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">207</div>
          </div>
          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Failed or duplicate</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">7</div>
          </div>
        </div>

        {/* 2-Column Content: Table & Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Table */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 font-normal">
                    <th className="py-2.5 pr-3 font-normal">Event</th>
                    <th className="py-2.5 px-3 font-normal">Type</th>
                    <th className="py-2.5 px-3 font-normal">Resource</th>
                    <th className="py-2.5 px-3 font-normal">Signature</th>
                    <th className="py-2.5 px-3 font-normal">Status</th>
                    <th className="py-2.5 px-3 font-normal">Tries</th>
                    <th className="py-2.5 pl-3 font-normal">At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {SEED_EVENTS.map((evt, idx) => {
                    const isSelected = selectedEvent.eventId === evt.eventId && selectedEvent.at === evt.at;

                    const statusBadge =
                      evt.status === 'Failed' ? (
                        <span className="px-2.5 py-0.5 rounded-full border border-rose-400 dark:border-rose-700 text-rose-600 dark:text-rose-400 text-xs">
                          Failed
                        </span>
                      ) : evt.status === 'Duplicate' ? (
                        <span className="px-2.5 py-0.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs">
                          Duplicate
                        </span>
                      ) : evt.status === 'Processed' ? (
                        <span className="px-2.5 py-0.5 rounded-full border border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 text-xs">
                          Processed
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full border border-amber-400 dark:border-amber-700 text-amber-600 dark:text-amber-400 text-xs">
                          Received
                        </span>
                      );

                    return (
                      <tr
                        key={`${evt.eventId}-${idx}`}
                        onClick={() => setSelectedEvent(evt)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-slate-50 dark:bg-[#152033]'
                            : 'hover:bg-slate-50/50 dark:hover:bg-[#121b2b]'
                        }`}
                      >
                        <td className="py-3.5 pr-3 font-medium text-slate-900 dark:text-white">{evt.eventId}</td>
                        <td className="py-3.5 px-3 font-mono text-xs text-slate-700 dark:text-slate-300">{evt.type}</td>
                        <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">{evt.resource}</td>
                        <td className="py-3.5 px-3">
                          <span className="px-2.5 py-0.5 rounded-full border border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 text-xs">
                            {evt.signature}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">{statusBadge}</td>
                        <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400">{evt.tries}</td>
                        <td className="py-3.5 pl-3 font-mono text-slate-500 dark:text-slate-400">{evt.at}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Detail Card */}
          <div className="lg:col-span-4 bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs p-6 space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">{selectedEvent.eventId}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Raw payload and processing log</p>
            </div>

            {/* Code box */}
            <div className="p-3.5 rounded-xl bg-[#edf3fa] dark:bg-[#131d2e] border border-blue-200/40 dark:border-blue-900/40 font-mono text-xs text-slate-800 dark:text-slate-200 break-all leading-relaxed">
              {selectedEvent.rawPayload}
            </div>

            {/* Processing attempts */}
            <div className="space-y-3 pt-2 text-xs">
              {selectedEvent.attempts.map((att, i) => (
                <div key={i} className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white mr-1.5">{att.label}</span>
                  {att.isError ? (
                    <>
                      <span className="text-rose-600 dark:text-rose-400 font-medium">failed</span>{' '}
                      <span>{att.statusText.replace('failed ', '')}</span>
                    </>
                  ) : (
                    <span>{att.statusText}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
