import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

// ─── Sub-components ───────────────────────────────────────────────────────────

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      {subtitle && <p className="text-xs text-slate-500 mt-0.5 mb-4">{subtitle}</p>}
      {!subtitle && <div className="mt-3" />}
      {children}
    </div>
  );
}

// ─── Empty queue panel ────────────────────────────────────────────────────────

function EmptyQueuePanel() {
  const navigate = useNavigate();
  return (
    <Panel title="Empty queue" subtitle="No exceptions yet. Run a demo checkout and switch on a fault to see your first case.">
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={() => navigate('/shop')}
          className="px-3.5 py-1.5 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white text-xs font-semibold shadow-sm cursor-pointer"
        >
          Open demo shop
        </button>
        <button
          onClick={() => navigate('/queue')}
          className="text-xs text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
        >
          How cases are detected
        </button>
      </div>
    </Panel>
  );
}

// ─── No search results panel ──────────────────────────────────────────────────

function NoResultsPanel() {
  const [cleared, setCleared] = useState(false);
  return (
    <Panel title="No search results" subtitle={cleared ? 'Filters cleared.' : 'No case matches "10999". Try an order id, a capture id, or clear the filters.'}>
      {!cleared && (
        <button
          onClick={() => setCleared(true)}
          className="mt-2 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
        >
          Clear filters
        </button>
      )}
      {cleared && (
        <button
          onClick={() => setCleared(false)}
          className="mt-2 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 text-xs font-medium hover:bg-slate-50 cursor-pointer"
        >
          Reset demo
        </button>
      )}
    </Panel>
  );
}

// ─── Toasts panel ────────────────────────────────────────────────────────────

type Toast = { id: number; message: string; action: string; variant: 'success' | 'error' };

function ToastsPanel() {
  const [toasts, setToasts] = useState<Toast[]>([
    { id: 1, message: 'Order #10482 synced to PAID.', action: 'Undo', variant: 'success' },
    { id: 2, message: 'Could not reach PayPal. Try again.', action: 'Retry', variant: 'error' },
  ]);

  const dismiss = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <Panel title="Toasts">
      <div className="space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-2.5 shadow-sm"
          >
            <span className="text-xs text-slate-700">{t.message}</span>
            <div className="flex items-center gap-3 ml-4">
              <button
                onClick={() => dismiss(t.id)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                {t.action}
              </button>
            </div>
          </div>
        ))}
        {toasts.length === 0 && (
          <div className="text-xs text-slate-400 italic">All toasts dismissed.</div>
        )}
      </div>
    </Panel>
  );
}

// ─── Inline confirm panel ─────────────────────────────────────────────────────

function InlineConfirmPanel() {
  const [state, setState] = useState<'idle' | 'confirmed' | 'cancelled'>('idle');

  return (
    <Panel title="Inline confirm, no modal">
      {state === 'idle' && (
        <div className="bg-[#f0f4f9] rounded-lg px-4 py-4 border border-slate-200 space-y-3">
          <div>
            <p className="text-xs font-semibold text-slate-900">Sync order #10482 to PAID?</p>
            <p className="text-xs text-slate-500 mt-0.5">This changes the shop order only. No money moves.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setState('confirmed')}
              className="px-3.5 py-1.5 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white text-xs font-semibold shadow-sm cursor-pointer"
            >
              Confirm sync
            </button>
            <button
              onClick={() => setState('cancelled')}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {state === 'confirmed' && (
        <div className="text-xs text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
          ✓ Order synced to PAID.{' '}
          <button onClick={() => setState('idle')} className="text-blue-600 underline cursor-pointer">Reset</button>
        </div>
      )}
      {state === 'cancelled' && (
        <div className="text-xs text-slate-500 italic">
          Action cancelled.{' '}
          <button onClick={() => setState('idle')} className="text-blue-600 underline cursor-pointer">Reset</button>
        </div>
      )}
    </Panel>
  );
}

// ─── Error banner panel ───────────────────────────────────────────────────────

function ErrorBannerPanel() {
  const [dismissed, setDismissed] = useState(false);
  return (
    <Panel title="Error banner">
      {!dismissed ? (
        <div className="flex items-center justify-between bg-white border border-rose-300 rounded-lg px-4 py-3">
          <span className="text-xs text-slate-700">AI investigator is degraded. Rule-based findings are still shown.</span>
          <button onClick={() => setDismissed(true)} className="ml-4 text-slate-400 hover:text-slate-600 cursor-pointer text-xs">✕</button>
        </div>
      ) : (
        <div className="text-xs text-slate-400 italic">
          Banner dismissed.{' '}
          <button onClick={() => setDismissed(false)} className="text-blue-600 underline cursor-pointer">Reset</button>
        </div>
      )}
    </Panel>
  );
}

// ─── Form validation panel ────────────────────────────────────────────────────

function FormValidationPanel() {
  const [pw, setPw] = useState('');
  const tooShort = pw.length > 0 && pw.length < 12;
  const valid = pw.length >= 12;

  return (
    <Panel title="Form validation" subtitle="New password">
      <div className="space-y-1">
        <input
          type="password"
          placeholder="Enter at least 12 characters"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent font-mono bg-white ${
            tooShort
              ? 'border-rose-400 focus:ring-rose-500'
              : valid
              ? 'border-emerald-400 focus:ring-emerald-500'
              : 'border-slate-200 focus:ring-blue-600'
          }`}
        />
        {tooShort && (
          <p className="text-xs text-rose-500 font-medium pt-0.5">Password is too short.</p>
        )}
        {valid && (
          <p className="text-xs text-emerald-600 font-medium pt-0.5">✓ Strong enough.</p>
        )}
      </div>
    </Panel>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UIStatesPage() {
  const [key, setKey] = useState(0);

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Empty, error and feedback states
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Every state a user can land in, designed.</p>
        </div>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
        >
          Sample data
        </button>
      </div>

      {/* Grid of state panels — reset all when key changes */}
      <div key={key} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <EmptyQueuePanel />
        <NoResultsPanel />
        <ToastsPanel />
        <InlineConfirmPanel />
        <ErrorBannerPanel />
        <FormValidationPanel />
      </div>
    </AppLayout>
  );
}
