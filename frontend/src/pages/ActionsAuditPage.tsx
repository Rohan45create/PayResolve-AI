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
      status: 'Awaiting approval',
    },
    {
      id: 'act-2',
      title: 'Hold second refund',
      caseId: 'Case PR-0138',
      description: 'A refund already completed in PayPal. Flag the order to prevent a duplicate.',
      citations: 'Cited: capture, order',
      status: 'Awaiting approval',
    },
  ]);

  const [auditLog, setAuditLog] = useState<AuditEntry[]>([
    { time: '10:06', actor: 'operator', action: 'Approved SYNC_ORDER_STATUS', subject: 'Case PR-0140' },
    { time: '10:04', actor: 'system', action: 'Proposed SYNC_ORDER_STATUS', subject: 'Case PR-0140' },
    { time: '09:55', actor: 'operator', action: 'Rejected HOLD_REFUND', subject: 'Case PR-0138' },
    { time: '09:41', actor: 'system', action: 'Opened case', subject: 'Case PR-0138' },
  ]);

  const handleApprove = (actionId: string) => {
    const act = actions.find((a) => a.id === actionId);
    if (!act) return;

    setActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, status: 'Approved' } : a)),
    );

    setAuditLog((prev) => [
      {
        time: '10:08',
        actor: 'operator',
        action: `Approved ${act.title.toUpperCase().replace(/\s+/g, '_')}`,
        subject: act.caseId,
      },
      ...prev,
    ]);
  };

  const handleReject = (actionId: string) => {
    const act = actions.find((a) => a.id === actionId);
    if (!act) return;

    setActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, status: 'Rejected' } : a)),
    );

    setAuditLog((prev) => [
      {
        time: '10:09',
        actor: 'operator',
        action: `Rejected ${act.title.toUpperCase().replace(/\s+/g, '_')}`,
        subject: act.caseId,
      },
      ...prev,
    ]);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Actions and audit
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              The AI only proposes. Nothing runs until an operator approves.
            </p>
          </div>
          <div>
            <button
              onClick={() => alert('Sample approval scenarios and immutable audit records active.')}
              className="px-4 py-2 rounded-lg bg-white dark:bg-[#131b26] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer shadow-2xs"
            >
              Sample data
            </button>
          </div>
        </div>

        {/* 2-Column Content: Proposed Actions & Audit Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Action Cards */}
          <div className="lg:col-span-7 space-y-5">
            {actions.map((act) => (
              <div
                key={act.id}
                className="bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-4 shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {act.title}
                    </h2>
                    <span className="px-3 py-0.5 rounded-full border border-amber-500/60 text-amber-600 dark:text-amber-400 text-xs font-normal">
                      {act.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {act.caseId}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {act.description}
                </p>

                <div className="flex items-center space-x-3 pt-1">
                  <button
                    onClick={() => handleApprove(act.id)}
                    className="px-5 py-2 rounded-lg bg-[#0066cc] hover:bg-blue-600 active:scale-[0.98] text-white font-medium text-xs sm:text-sm shadow-sm cursor-pointer transition-all"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(act.id)}
                    className="px-5 py-2 rounded-lg bg-white dark:bg-[#131b26] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] font-medium text-xs sm:text-sm shadow-2xs cursor-pointer transition-all"
                  >
                    Reject
                  </button>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                    {act.citations}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Audit Log Card */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-4 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Audit log</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Append-only. Every proposal and decision is recorded.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400">
                    <th className="py-2.5 pr-2 font-normal">Time</th>
                    <th className="py-2.5 px-2 font-normal">Actor</th>
                    <th className="py-2.5 px-2 font-normal">Action</th>
                    <th className="py-2.5 pl-2 font-normal">Subject</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                  {auditLog.map((log, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-[#121b2b]">
                      <td className="py-3 pr-2 text-slate-500 dark:text-slate-400">{log.time}</td>
                      <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{log.actor}</td>
                      <td className="py-3 px-2 text-slate-800 dark:text-slate-200 font-sans text-[11px] sm:text-xs">
                        {log.action}
                      </td>
                      <td className="py-3 pl-2 text-slate-600 dark:text-slate-400 font-sans text-xs">
                        {log.subject}
                      </td>
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
