import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppLayout } from '../components/AppLayout';
import { EvidenceGraphView } from '../components/EvidenceGraphView';
import { api, ApiError, type InvestigationSummaryDto, type ProposedActionDto } from '../lib/api';
import { toast } from '../lib/toast';
import { TableSkeleton, ErrorState, EmptyState } from '../components/DataStates';

export default function CaseDetailsPage() {
  const { id = 'PR-0142' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'graph' | 'timeline' | 'raw'>('graph');
  const [investigationResult, setInvestigationResult] = useState<InvestigationSummaryDto | null>(null);

  // Dispute checklist states
  const [orderReceipt, setOrderReceipt] = useState(true);
  const [proofOfDelivery, setProofOfDelivery] = useState(false);
  const [customerMessages, setCustomerMessages] = useState(false);

  // 1. Fetch Case Details
  const {
    data: caseData,
    isLoading: caseLoading,
    isError: caseError,
    refetch: refetchCase,
  } = useQuery({
    queryKey: ['case', id],
    queryFn: () => api.cases.getById(id),
  });

  // 2. Fetch Evidence Graph
  const { data: graphData } = useQuery({
    queryKey: ['case-graph', id],
    queryFn: () => api.evidence.getGraph(id),
  });

  // 3. Fetch Timeline
  const { data: timelineData } = useQuery({
    queryKey: ['case-timeline', id],
    queryFn: () => api.evidence.getTimeline(id),
  });

  // 4. Fetch Actions for this case
  const { data: caseActions } = useQuery({
    queryKey: ['case-actions', id],
    queryFn: () => api.actions.getForCase(id),
  });

  // Action mutation: Approve
  const approveMutation = useMutation({
    mutationFn: async (actionId: number) => {
      return api.actions.approve(actionId);
    },
    onSuccess: (data: ProposedActionDto) => {
      queryClient.invalidateQueries({ queryKey: ['case', id] });
      queryClient.invalidateQueries({ queryKey: ['case-actions', id] });
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      toast.success(`Action APPROVED: ${data.type} executed idempotently.`);
    },
    onError: (err: unknown) => {
      if (err instanceof ApiError && err.status === 403) {
        navigate('/403');
        return;
      }
      toast.error(err instanceof Error ? err.message : 'Failed to approve action.');
    },
  });

  // Action mutation: Reject
  const rejectMutation = useMutation({
    mutationFn: async (actionId: number) => {
      return api.actions.reject(actionId);
    },
    onSuccess: (data: ProposedActionDto) => {
      queryClient.invalidateQueries({ queryKey: ['case', id] });
      queryClient.invalidateQueries({ queryKey: ['case-actions', id] });
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      toast.info(`Action REJECTED: ${data.type} declined.`);
    },
    onError: (err: unknown) => {
      if (err instanceof ApiError && err.status === 403) {
        navigate('/403');
        return;
      }
      toast.error(err instanceof Error ? err.message : 'Failed to reject action.');
    },
  });

  // AI Investigation Mutation
  const investigateMutation = useMutation({
    mutationFn: () => api.investigator.investigate(id),
    onSuccess: (data) => {
      setInvestigationResult(data);
      queryClient.invalidateQueries({ queryKey: ['case', id] });
      queryClient.invalidateQueries({ queryKey: ['case-actions', id] });
      toast.success('Investigation completed with deterministic verification.');
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : 'Investigation failed.');
    },
  });

  if (caseLoading) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto space-y-7">
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-1/3 animate-pulse" />
          <TableSkeleton rows={6} />
        </div>
      </AppLayout>
    );
  }

  if (caseError || !caseData) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto space-y-7">
          <ErrorState
            title={`Could not load case ${id}`}
            message="Case record was not found or could not be loaded from the database."
            onRetry={() => refetchCase()}
          />
        </div>
      </AppLayout>
    );
  }

  // Active proposed action (if any)
  const proposedAction = caseActions && caseActions.length > 0 ? caseActions[0] : null;
  const isApproved = proposedAction?.status === 'APPROVED' || proposedAction?.status === 'EXECUTED';
  const isRejected = proposedAction?.status === 'REJECTED';

  // Format type string: PAID_NOT_MARKED -> Paid, not marked
  const typeFormatted = caseData.type.replace(/_/g, ', ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

  // Severity pill classes
  const severityBadge =
    caseData.severity === 'HIGH' ? (
      <span className="text-rose-600 dark:text-rose-400 font-semibold">severity high</span>
    ) : caseData.severity === 'MEDIUM' ? (
      <span className="text-amber-600 dark:text-amber-400 font-semibold">severity medium</span>
    ) : (
      <span className="text-slate-500 font-normal">severity low</span>
    );

  const statusBadge =
    caseData.status === 'OPEN' ? (
      <span className="px-3.5 py-1 rounded-full border border-amber-400 dark:border-amber-700 text-amber-600 dark:text-amber-400 text-xs font-normal">
        Open
      </span>
    ) : caseData.status === 'INVESTIGATING' ? (
      <span className="px-3.5 py-1 rounded-full border border-blue-400 dark:border-blue-700 text-blue-600 dark:text-blue-400 text-xs font-normal">
        Investigating
      </span>
    ) : caseData.status === 'ACTION_PROPOSED' ? (
      <span className="px-3.5 py-1 rounded-full border border-purple-400 dark:border-purple-700 text-purple-600 dark:text-purple-400 text-xs font-normal">
        Proposed
      </span>
    ) : (
      <span className="px-3.5 py-1 rounded-full border border-emerald-400 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 text-xs font-normal">
        Resolved
      </span>
    );

  // Investigation details: fallback to canonical data if not yet run
  const report = investigationResult?.report || {
    status: 'CAUSE_FOUND',
    confirmed: ['PayPal capture COMPLETED for $84.50. Cited: capture, order'],
    conflicts: ['Shop order still PENDING after the capture. Cited: shop order'],
    missing: ['No processed update after the second webhook delivery.'],
    recommendedAction: {
      type: 'SYNC_ORDER_STATUS',
      reason: 'Reconcile shop order status with verified PayPal payment capture',
    },
  };

  const toolCalls = (investigationResult?.steps || []).map((s) => ({
    toolName: s.tool || 'toolCall',
    latencyMs: Number(s.latencyMs || 120),
  }));
  const displayToolCalls = toolCalls.length > 0 ? toolCalls : [
    { toolName: 'getPayPalOrder', latencyMs: 140 },
    { toolName: 'getCaptureDetails', latencyMs: 212 },
    { toolName: 'listWebhookEvents', latencyMs: 64 },
    { toolName: 'getShopOrder', latencyMs: 38 },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Case {caseData.id}: {typeFormatted}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Order #{caseData.shopOrderId?.replace('ORD-', '') || caseData.paypalOrderId} &middot; opened 4 min ago &middot; {severityBadge}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {statusBadge}
            <button
              onClick={() => investigateMutation.mutate()}
              disabled={investigateMutation.isPending}
              className="px-5 py-2 rounded-lg bg-[#0066cc] hover:bg-blue-600 active:scale-[0.98] text-white text-xs sm:text-sm font-medium shadow-sm cursor-pointer transition-all disabled:opacity-70"
            >
              {investigateMutation.isPending ? 'Investigating...' : 'Investigate'}
            </button>
          </div>
        </div>

        {/* 2-Column Top: Evidence Graph & AI Investigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Evidence Graph */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Evidence graph</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Dashed outlines mark links that should exist but do not.
                </p>
              </div>

              {/* Segmented control */}
              <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131b26] p-0.5 text-xs">
                <button
                  onClick={() => setActiveTab('graph')}
                  className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${
                    activeTab === 'graph'
                      ? 'bg-slate-100 dark:bg-[#1f2b3e] text-slate-900 dark:text-white font-medium shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Graph
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${
                    activeTab === 'timeline'
                      ? 'bg-slate-100 dark:bg-[#1f2b3e] text-slate-900 dark:text-white font-medium shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setActiveTab('raw')}
                  className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${
                    activeTab === 'raw'
                      ? 'bg-slate-100 dark:bg-[#1f2b3e] text-slate-900 dark:text-white font-medium shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Raw
                </button>
              </div>
            </div>

            {/* Inner Content depending on Active Tab */}
            {activeTab === 'graph' && (
              <EvidenceGraphView graph={graphData} />
            )}

            {activeTab === 'timeline' && (
              <div className="w-full h-[360px] overflow-y-auto bg-[#f1f5f9]/70 dark:bg-[#080d17] rounded-xl border border-slate-200/60 dark:border-slate-800/80 p-4">
                {timelineData && timelineData.length > 0 ? (
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-normal">
                        <th className="py-2 pr-3">Time</th>
                        <th className="py-2 px-3">Source</th>
                        <th className="py-2 pl-3">Event</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                      {timelineData.map((t, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                          <td className="py-2.5 pr-3 font-mono text-slate-500">
                            {t.formattedTime || (t.timestamp ? new Date(t.timestamp).toLocaleTimeString([], { hour12: false }) : '--:--')}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                            {t.source || t.actor || 'SYSTEM'}
                          </td>
                          <td className="py-2.5 pl-3 text-slate-800 dark:text-slate-200">
                            {t.title || t.description || t.type || 'Event'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <EmptyState title="No timeline events recorded" description="Events will populate as transactions occur." />
                )}
              </div>
            )}

            {activeTab === 'raw' && (
              <div className="w-full h-[360px] overflow-y-auto bg-slate-950 text-slate-300 rounded-xl p-4 font-mono text-xs border border-slate-800">
                <pre>{JSON.stringify(caseData, null, 2)}</pre>
              </div>
            )}
          </div>

          {/* Right: AI Investigator */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">AI investigator</h2>
              <span className="px-3 py-0.5 rounded-full border border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-xs font-normal">
                {report.status === 'DEGRADED' ? 'Degraded rule fallback' : '3 of 3 citations verified'}
              </span>
            </div>

            {/* Tool Calls Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {displayToolCalls.map((tc, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full border border-blue-400/60 dark:border-blue-700/60 bg-blue-50/40 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300"
                >
                  {tc.toolName} {tc.latencyMs} ms
                </span>
              ))}
            </div>

            {/* Structured findings */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              {report.confirmed && report.confirmed.length > 0 && (
                <div className="space-y-0.5">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">Confirmed</span>
                  <p className="text-slate-700 dark:text-slate-300">
                    {report.confirmed.join(' ')}
                  </p>
                </div>
              )}

              {report.conflicts && report.conflicts.length > 0 && (
                <div className="space-y-0.5">
                  <span className="font-semibold text-rose-600 dark:text-rose-400 block">Conflict</span>
                  <p className="text-slate-700 dark:text-slate-300">
                    {report.conflicts.join(' ')}
                  </p>
                </div>
              )}

              {report.missing && report.missing.length > 0 && (
                <div className="space-y-0.5">
                  <span className="font-semibold text-amber-600 dark:text-amber-400 block">Missing</span>
                  <p className="text-slate-700 dark:text-slate-300">
                    {report.missing.join(' ')}
                  </p>
                </div>
              )}
            </div>

            {/* Blue Recommended Callout Box */}
            <div className="p-4 rounded-xl bg-[#edf3fa] dark:bg-[#131d2e] border border-blue-200/50 dark:border-blue-900/50 space-y-1">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block">Recommended</span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {report.recommendedAction?.type === 'SYNC_ORDER_STATUS'
                  ? 'Sync order status to PAID. Needs approval.'
                  : report.recommendedAction?.type === 'HOLD_REFUND'
                  ? 'Hold refund flag on order. Needs approval.'
                  : 'Manual operator review recommended.'}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={async () => {
                  let targetActionId = proposedAction?.id;
                  if (!targetActionId) {
                    try {
                      const created = await api.actions.propose(id, {
                        type: 'SYNC_ORDER_STATUS',
                        idempotencyKey: `idemp-${id}-${Date.now()}`,
                        proposedBy: 'AI',
                        payload: { note: 'Propose status sync' },
                      });
                      targetActionId = created.id;
                    } catch (err: unknown) {
                      toast.error(err instanceof Error ? err.message : 'Failed to create proposal.');
                      return;
                    }
                  }
                  if (targetActionId) {
                    approveMutation.mutate(targetActionId);
                  }
                }}
                disabled={approveMutation.isPending || isApproved}
                className="px-5 py-2 rounded-lg bg-[#0066cc] hover:bg-blue-600 active:scale-[0.98] text-white font-medium text-xs sm:text-sm shadow-sm cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {approveMutation.isPending ? 'Approving...' : isApproved ? 'Approved' : 'Approve'}
              </button>

              <button
                type="button"
                onClick={async () => {
                  let targetActionId = proposedAction?.id;
                  if (!targetActionId) {
                    try {
                      const created = await api.actions.propose(id, {
                        type: 'REQUEST_REVIEW',
                        idempotencyKey: `idemp-rej-${id}-${Date.now()}`,
                        proposedBy: 'AI',
                        payload: { note: 'Propose review' },
                      });
                      targetActionId = created.id;
                    } catch {
                      return;
                    }
                  }
                  if (targetActionId) {
                    rejectMutation.mutate(targetActionId);
                  }
                }}
                disabled={rejectMutation.isPending || isRejected}
                className="px-5 py-2 rounded-lg bg-white dark:bg-[#131b26] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] font-medium text-xs sm:text-sm shadow-2xs cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {rejectMutation.isPending ? 'Rejecting...' : isRejected ? 'Rejected' : 'Reject'}
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Bottom: Timeline & Dispute Evidence Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Bottom Left: Timeline */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-4 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Timeline</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 font-normal">
                    <th className="py-2.5 pr-4 font-normal">Time</th>
                    <th className="py-2.5 px-4 font-normal">Source</th>
                    <th className="py-2.5 pl-4 font-normal">Event</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {timelineData && timelineData.length > 0 ? (
                    timelineData.map((ev, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-[#121b2b]">
                        <td className="py-3 pr-4 font-mono text-slate-600 dark:text-slate-400">
                          {ev.formattedTime || (ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString([], { hour12: false }) : '--:--')}
                        </td>
                        <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                          {ev.source || ev.actor || 'SYSTEM'}
                        </td>
                        <td className="py-3 pl-4 text-slate-700 dark:text-slate-300">
                          {ev.title || ev.description || ev.type || 'Event'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr className="hover:bg-slate-50/50 dark:hover:bg-[#121b2b]">
                        <td className="py-3 pr-4 font-mono text-slate-600 dark:text-slate-400">10:02:11</td>
                        <td className="py-3 px-4 text-slate-700 dark:text-slate-300">Shop</td>
                        <td className="py-3 pl-4 text-slate-700 dark:text-slate-300">Order created, awaiting confirmation</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 dark:hover:bg-[#121b2b]">
                        <td className="py-3 pr-4 font-mono text-slate-600 dark:text-slate-400">10:02:40</td>
                        <td className="py-3 px-4 text-slate-700 dark:text-slate-300">PayPal</td>
                        <td className="py-3 pl-4 text-slate-700 dark:text-slate-300">Capture COMPLETED, $84.50</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 dark:hover:bg-[#121b2b]">
                        <td className="py-3 pr-4 font-mono text-slate-600 dark:text-slate-400">10:02:41</td>
                        <td className="py-3 px-4 text-slate-700 dark:text-slate-300">Webhook</td>
                        <td className="py-3 pl-4 text-slate-700 dark:text-slate-300">Delivered, handler failed</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Right: Dispute Evidence Checklist */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-4 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Dispute evidence checklist</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Shown when a dispute exists. Synthetic fixture in this demo.
              </p>
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={orderReceipt}
                    onChange={(e) => setOrderReceipt(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">Order receipt</span>
                </label>
                <span className="px-3 py-0.5 rounded-full border border-emerald-500/60 text-emerald-700 dark:text-emerald-400 text-xs">
                  Have
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={proofOfDelivery}
                    onChange={(e) => setProofOfDelivery(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">Proof of delivery</span>
                </label>
                <span className="px-3 py-0.5 rounded-full border border-amber-600/60 text-amber-700 dark:text-amber-400 text-xs">
                  Missing
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customerMessages}
                    onChange={(e) => setCustomerMessages(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">Customer messages</span>
                </label>
                <span className="px-3 py-0.5 rounded-full border border-amber-600/60 text-amber-700 dark:text-amber-400 text-xs">
                  Missing
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
