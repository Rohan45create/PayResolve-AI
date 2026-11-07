import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';

export default function CaseDetailsPage() {
  const [activeTab, setActiveTab] = useState<'graph' | 'timeline' | 'raw'>('graph');
  const [investigating, setInvestigating] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  // Checklist states
  const [orderReceipt, setOrderReceipt] = useState(true);
  const [proofOfDelivery, setProofOfDelivery] = useState(false);
  const [customerMessages, setCustomerMessages] = useState(false);

  const handleInvestigate = () => {
    setInvestigating(true);
    setTimeout(() => {
      setInvestigating(false);
    }, 1000);
  };

  const handleApprove = () => {
    setApproved(true);
    setRejected(false);
    alert('Action APPROVED: Sync order status to PAID executed via idempotency key: idemp-PR-0142');
  };

  const handleReject = () => {
    setRejected(true);
    setApproved(false);
    alert('Action REJECTED: Case status preserved as Open.');
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Case PR-0142: Paid, not marked
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Order #10482 &middot; opened 4 min ago &middot; severity high
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3.5 py-1 rounded-full border border-amber-400 dark:border-amber-700 text-amber-600 dark:text-amber-400 text-xs font-normal">
              Open
            </span>
            <button
              onClick={handleInvestigate}
              disabled={investigating}
              className="px-5 py-2 rounded-lg bg-[#0066cc] hover:bg-blue-600 active:scale-[0.98] text-white text-xs sm:text-sm font-medium shadow-sm cursor-pointer transition-all"
            >
              {investigating ? 'Investigating...' : 'Investigate'}
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

            {/* Inner Interactive Graph Canvas */}
            <div className="relative w-full h-[340px] bg-[#f1f5f9]/70 dark:bg-[#080d17] rounded-xl border border-slate-200/60 dark:border-slate-800/80 p-6 overflow-hidden flex items-center justify-center">
              
              {/* SVG Connecting Edges */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Order -> Capture */}
                <path d="M 120 150 L 190 115" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
                {/* Order -> Webhook */}
                <path d="M 120 150 L 190 205" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
                {/* Capture -> Webhook */}
                <path d="M 230 140 L 230 180" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
                {/* Capture -> Shop order (MISSING DASHED ORANGE) */}
                <path d="M 280 115 L 350 150" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                {/* Webhook -> No shipment yet (MISSING DASHED) */}
                <path d="M 280 205 L 350 230" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              </svg>

              {/* Node 1: PayPal order */}
              <div className="absolute left-6 top-32 bg-white dark:bg-[#131b26] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-left shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-800 dark:text-white">PayPal order</div>
                <div className="text-[10px] text-slate-400">approved</div>
              </div>

              {/* Node 2: Capture */}
              <div className="absolute left-48 top-16 bg-white dark:bg-[#131b26] border-2 border-blue-500 rounded-lg px-3.5 py-2 text-left shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white">Capture</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">COMPLETED, $84.50</div>
              </div>

              {/* Node 3: Webhook */}
              <div className="absolute left-48 bottom-16 bg-white dark:bg-[#131b26] border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2 text-left shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white">Webhook</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">delivered twice</div>
              </div>

              {/* Annotation label: missing: PAID update */}
              <div className="absolute left-[295px] top-[115px] text-[10px] text-amber-600 dark:text-amber-400 bg-white/80 dark:bg-[#080d17]/80 px-1 py-0.5 rounded">
                missing: PAID update
              </div>

              {/* Node 4: Shop order #10482 */}
              <div className="absolute right-12 top-28 bg-white dark:bg-[#131b26] border-2 border-amber-600/70 rounded-lg px-4 py-2.5 text-left shadow-2xs">
                <div className="text-[11px] font-semibold text-slate-900 dark:text-white">Shop order #10482</div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400">still PENDING</div>
              </div>

              {/* Node 5: No shipment yet (dashed) */}
              <div className="absolute right-12 bottom-12 border-2 border-dashed border-amber-600/50 rounded-lg px-4 py-2 text-left bg-white/40 dark:bg-[#131b26]/40">
                <div className="text-[10px] text-slate-500 dark:text-slate-400">No shipment yet</div>
              </div>
            </div>
          </div>

          {/* Right: AI Investigator */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">AI investigator</h2>
              <span className="px-3 py-0.5 rounded-full border border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-xs font-normal">
                3 of 3 citations verified
              </span>
            </div>

            {/* Tool Calls Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-full border border-blue-400/60 dark:border-blue-700/60 bg-blue-50/40 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300">
                getPayPalOrder 140 ms
              </span>
              <span className="px-2.5 py-1 rounded-full border border-blue-400/60 dark:border-blue-700/60 bg-blue-50/40 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300">
                getCaptureDetails 212 ms
              </span>
              <span className="px-2.5 py-1 rounded-full border border-blue-400/60 dark:border-blue-700/60 bg-blue-50/40 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300">
                listWebhookEvents 64 ms
              </span>
              <span className="px-2.5 py-1 rounded-full border border-blue-400/60 dark:border-blue-700/60 bg-blue-50/40 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300">
                getShopOrder 38 ms
              </span>
            </div>

            {/* Structured findings */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="space-y-0.5">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">Confirmed</span>
                <p className="text-slate-700 dark:text-slate-300">
                  PayPal capture COMPLETED for $84.50. Cited: capture, order
                </p>
              </div>

              <div className="space-y-0.5">
                <span className="font-semibold text-rose-600 dark:text-rose-400 block">Conflict</span>
                <p className="text-slate-700 dark:text-slate-300">
                  Shop order still PENDING after the capture. Cited: shop order
                </p>
              </div>

              <div className="space-y-0.5">
                <span className="font-semibold text-amber-600 dark:text-amber-400 block">Missing</span>
                <p className="text-slate-700 dark:text-slate-300">
                  No processed update after the second webhook delivery.
                </p>
              </div>
            </div>

            {/* Blue Recommended Callout Box */}
            <div className="p-4 rounded-xl bg-[#edf3fa] dark:bg-[#131d2e] border border-blue-200/50 dark:border-blue-900/50 space-y-1">
              <span className="text-xs font-semibold text-slate-900 dark:text-white block">Recommended</span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Sync order status to PAID. Needs approval.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleApprove}
                className="px-5 py-2 rounded-lg bg-[#0066cc] hover:bg-blue-600 active:scale-[0.98] text-white font-medium text-xs sm:text-sm shadow-sm cursor-pointer transition-all"
              >
                {approved ? 'Approved' : 'Approve'}
              </button>
              <button
                onClick={handleReject}
                className="px-5 py-2 rounded-lg bg-white dark:bg-[#131b26] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] font-medium text-xs sm:text-sm shadow-2xs cursor-pointer transition-all"
              >
                {rejected ? 'Rejected' : 'Reject'}
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
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-[#121b2b]">
                    <td className="py-3 pr-4 font-mono text-slate-600 dark:text-slate-400">10:02:56</td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">Webhook</td>
                    <td className="py-3 pl-4 text-slate-700 dark:text-slate-300">Delivered again, no change</td>
                  </tr>
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
              {/* Item 1 */}
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={orderReceipt}
                    onChange={(e) => setOrderReceipt(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">Order receipt</span>
                </label>
                <span className="px-3 py-0.5 rounded-full border border-emerald-500/60 text-emerald-700 dark:text-emerald-400 text-xs">
                  Have
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={proofOfDelivery}
                    onChange={(e) => setProofOfDelivery(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">Proof of delivery</span>
                </label>
                <span className="px-3 py-0.5 rounded-full border border-amber-600/60 text-amber-700 dark:text-amber-400 text-xs">
                  Missing
                </span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customerMessages}
                    onChange={(e) => setCustomerMessages(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
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
