import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';

interface ProposedAction {
  id: string;
  title: string;
  caseId: string;
  description: string;
  citations: string;
  status: 'Awaiting approval' | 'Approved' | 'Rejected';
}

interface AuditEntry {
  time: string;
  actor: 'operator' | 'system';
  action: string;
  subject: string;
}

export default function ActionsAuditPage() {
  const [actions, setActions] = useState<ProposedAction[]>([
    {
      id: 'act-1',
      title: 'Sync order status to PAID',
      caseId: 'Case PR-0142',
      description: 'Capture is completed in PayPal but the shop order is pending.',
      citations: 'Cited: capture, order',
      status: 'Awaiting approval'
    },
    {
      id: 'act-2',
      title: 'Hold second refund',
      caseId: 'Case PR-0138',
      description: 'A refund already completed in PayPal. Flag the order to prevent a duplicate.',
      citations: 'Cited: capture, order',
      status: 'Awaiting approval'
    }
  ]);

  const [auditLog, setAuditLog] = useState<AuditEntry[]>([
    { time: '10:06', actor: 'operator', action: 'Approved SYNC_ORDER_STATUS', subject: 'Case PR-0140' },
    { time: '10:04', actor: 'system', action: 'Proposed SYNC_ORDER_STATUS', subject: 'Case PR-0140' },
    { time: '09:55', actor: 'operator', action: 'Rejected HOLD_REFUND', subject: 'Case PR-0138' },
    { time: '09:41', actor: 'system', action: 'Opened case', subject: 'Case PR-0138' },
  ]);

  const handleApprove = (actionId: string) => {
    const act = actions.find(a => a.id === actionId);
    if (!act) return;

    setActions(prev => prev.map(a => a.id === actionId ? { ...a, status: 'Approved' } : a));
    
    // Append to audit log
    const timeStr = '10:08';
    setAuditLog(prev => [
      { time: timeStr, actor: 'operator', action: `Approved ${act.title.toUpperCase()}`, subject: act.caseId },
      ...prev
    ]);

    alert(`Action executed: ${act.title} with idempotency key: idemp-${act.id}`);
  };

  const handleReject = (actionId: string) => {
    const act = actions.find(a => a.id === actionId);
    if (!act) return;

    setActions(prev => prev.map(a => a.id === actionId ? { ...a, status: 'Rejected' } : a));
    
    const timeStr = '10:09';
    setAuditLog(prev => [
      { time: timeStr, actor: 'operator', action: `Rejected ${act.title.toUpperCase()}`, subject: act.caseId },
      ...prev
    ]);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Actions and audit
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              The AI only proposes. Nothing runs until an operator approves.
            </p>
          </div>

          <div>
            <button
              onClick={() => alert('Sample test proposals refreshed.')}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium shadow-xs cursor-pointer"
            >
              Sample data
            </button>
          </div>
        </div>

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Proposed Actions */}
          <div className="lg:col-span-6 space-y-4">
            {actions.map((act) => (
              <div key={act.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
                
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-slate-900 text-base">{act.title}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        act.status === 'Approved'
                          ? 'border-emerald-300 text-emerald-700 bg-emerald-50'
                          : act.status === 'Rejected'
                          ? 'border-rose-300 text-rose-600 bg-rose-50'
                          : 'border-amber-300 text-amber-800 bg-amber-50'
                      }`}>
                        {act.status}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 shrink-0 font-medium">{act.caseId}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {act.description}
                </p>

                <div className="flex items-center space-x-3 pt-1">
                  {act.status === 'Awaiting approval' ? (
                    <>
                      <button
                        onClick={() => handleApprove(act.id)}
                        className="px-4 py-2 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-semibold text-xs shadow-xs cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(act.id)}
                        className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs shadow-xs cursor-pointer"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500">
                      Status resolved: {act.status}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 font-mono pl-2">
                    {act.citations}
                  </span>
                </div>

              </div>
            ))}
          </div>

          {/* Right: Append-Only Audit Log */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Audit log</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Append-only. Every proposal and decision is recorded.
              </p>
            </div>

            <div className="overflow-x-auto pt-1">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100 font-sans">
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">Actor</th>
                    <th className="pb-3 font-medium">Action</th>
                    <th className="pb-3 font-medium">Subject</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {auditLog.map((log, idx) => (
                    <tr key={idx}>
                      <td className="py-3 text-slate-500">{log.time}</td>
                      <td className="py-3 font-medium text-slate-800">{log.actor}</td>
                      <td className="py-3 font-sans text-slate-700">{log.action}</td>
                      <td className="py-3 text-slate-500">{log.subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}
