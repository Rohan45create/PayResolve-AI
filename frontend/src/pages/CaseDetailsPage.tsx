import { useState } from 'react';
import { Play } from 'lucide-react';
import { AppLayout } from '../components/AppLayout';

export default function CaseDetailsPage() {
  const [activeTab, setActiveTab] = useState<'graph' | 'timeline' | 'raw'>('graph');
  const [investigating, setInvestigating] = useState(false);
  const [actionApproved, setActionApproved] = useState(false);
  const [actionRejected, setActionRejected] = useState(false);
  
  // Checklist states
  const [orderReceipt, setOrderReceipt] = useState(true);
  const [proofOfDelivery, setProofOfDelivery] = useState(false);
  const [customerMessages, setCustomerMessages] = useState(false);

  const handleInvestigate = () => {
    setInvestigating(true);
    setTimeout(() => {
      setInvestigating(false);
      alert('AI Investigator completed 4-tool execution. 3 citations verified, 0 hallucinations detected.');
    }, 1200);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Case PR-0142: Paid, not marked
              </h1>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-amber-300 bg-amber-50 text-amber-700">
                Open
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-mono">
              Order #10482 &bull; opened 4 min ago &bull; severity high
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleInvestigate}
              disabled={investigating}
              className="px-5 py-2.5 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-xs cursor-pointer flex items-center space-x-2"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${investigating ? 'animate-spin' : ''}`} />
              <span>{investigating ? 'Investigating...' : 'Investigate'}</span>
            </button>
          </div>
        </div>

        {/* Top 2 Columns: Evidence Graph & AI Investigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Evidence Graph */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Evidence graph</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dashed outlines mark links that should exist but do not.
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium">
                <button 
                  onClick={() => setActiveTab('graph')}
                  className={`px-3 py-1 rounded-md cursor-pointer ${activeTab === 'graph' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
                >
                  Graph
                </button>
                <button 
                  onClick={() => setActiveTab('timeline')}
                  className={`px-3 py-1 rounded-md cursor-pointer ${activeTab === 'timeline' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
                >
                  Timeline
                </button>
                <button 
                  onClick={() => setActiveTab('raw')}
                  className={`px-3 py-1 rounded-md cursor-pointer ${activeTab === 'raw' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
                >
                  Raw
                </button>
              </div>
            </div>

            {/* Visual Canvas Representation */}
            {activeTab === 'graph' && (
              <div className="min-h-[290px] bg-[#f0f4f9]/80 rounded-xl border border-slate-200/80 p-6 flex flex-col items-center justify-center relative">
                
                <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full items-center relative z-10">
                  
                  {/* PayPal Order Node */}
                  <div className="bg-white border border-slate-300 rounded-lg p-3 text-center shadow-xs">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">PayPal order</div>
                    <div className="text-xs font-bold text-slate-900 mt-1">approved</div>
                  </div>

                  {/* Center Stack: Capture + Webhook */}
                  <div className="space-y-4">
                    <div className="bg-white border-2 border-blue-500 rounded-lg p-2.5 text-center shadow-xs">
                      <div className="text-[10px] text-blue-600 uppercase font-bold tracking-wider">Capture</div>
                      <div className="text-xs font-bold text-slate-900 mt-0.5">COMPLETED, $84.50</div>
                    </div>

                    <div className="bg-white border border-slate-300 rounded-lg p-2.5 text-center shadow-xs">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Webhook</div>
                      <div className="text-xs text-slate-700 mt-0.5">delivered twice</div>
                    </div>
                  </div>

                  {/* Shop Order Node & Missing Link */}
                  <div className="space-y-4">
                    <div className="bg-[#fff9eb] border-2 border-amber-400 rounded-lg p-2.5 text-center shadow-xs">
                      <div className="text-[10px] text-amber-800 uppercase font-bold tracking-wider">Shop order #10482</div>
                      <div className="text-xs font-semibold text-amber-900 mt-0.5">still PENDING</div>
                    </div>

                    <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-2.5 text-center text-slate-400">
                      <div className="text-[11px] italic">No shipment yet</div>
                    </div>
                  </div>

                </div>

                {/* SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  <line x1="28%" y1="50%" x2="38%" y2="35%" stroke="#3b82f6" strokeWidth="1.5" />
                  <line x1="28%" y1="50%" x2="38%" y2="65%" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="62%" y1="35%" x2="72%" y2="35%" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
                  <line x1="62%" y1="65%" x2="72%" y2="65%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>

                <div className="w-full text-right pt-4 text-[11px] text-slate-400 font-mono">
                  missing: PAID update
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="font-semibold text-slate-700">Audit Timestamp Sequence:</div>
                <div className="font-mono text-slate-600">10:02:11 &bull; Shop order created ($84.50)</div>
                <div className="font-mono text-slate-600">10:02:40 &bull; PayPal capture settled (Capture ID: 7XY892)</div>
                <div className="font-mono text-slate-600">10:02:41 &bull; Webhook POST received, edge proxy timed out</div>
              </div>
            )}

            {activeTab === 'raw' && (
              <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto">
{`{
  "case_id": "PR-0142",
  "order_id": "#10482",
  "paypal_capture_id": "7XY8929104",
  "discrepancy": "PAID_NOT_MARKED",
  "dispute_protection_eligible": true
}`}
              </pre>
            )}

          </div>

          {/* Right: AI Investigator */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
            
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">AI investigator</h3>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                3 of 3 citations verified
              </span>
            </div>

            {/* Tool Execution Pills */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-700 font-mono">
                getPayPalOrder <span className="text-slate-400">140 ms</span>
              </span>
              <span className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-700 font-mono">
                getCaptureDetails <span className="text-slate-400">212 ms</span>
              </span>
              <span className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-700 font-mono">
                listWebhookEvents <span className="text-slate-400">64 ms</span>
              </span>
              <span className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-700 font-mono">
                getShopOrder <span className="text-slate-400">38 ms</span>
              </span>
            </div>

            {/* Findings List */}
            <div className="space-y-3.5 text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-emerald-700 uppercase tracking-wider text-[11px]">Confirmed</div>
                <p className="text-slate-700">
                  PayPal capture COMPLETED for $84.50. Cited: capture, order
                </p>
              </div>

              <div className="space-y-0.5">
                <div className="font-bold text-rose-600 uppercase tracking-wider text-[11px]">Conflict</div>
                <p className="text-slate-700">
                  Shop order still PENDING after the capture. Cited: shop order
                </p>
              </div>

              <div className="space-y-0.5">
                <div className="font-bold text-amber-700 uppercase tracking-wider text-[11px]">Missing</div>
                <p className="text-slate-700">
                  No processed update after the second webhook delivery.
                </p>
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-1">
              <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wide">Recommended</div>
              <p className="text-xs text-blue-800">
                Sync order status to PAID. Needs approval.
              </p>
            </div>

            {/* Approval Controls */}
            <div className="flex items-center space-x-3 pt-1">
              <button
                onClick={() => {
                  setActionApproved(true);
                  setActionRejected(false);
                  alert('Action Approved: Executing SYNC_ORDER_STATUS with idempotency key `sync-ord-10482`');
                }}
                disabled={actionApproved}
                className="px-5 py-2.5 rounded-lg bg-[#0066d6] hover:bg-blue-700 disabled:bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-xs cursor-pointer"
              >
                {actionApproved ? 'Approved ✓' : 'Approve'}
              </button>
              <button
                onClick={() => {
                  setActionRejected(true);
                  setActionApproved(false);
                  alert('Action proposal rejected.');
                }}
                disabled={actionRejected}
                className="px-5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm shadow-xs cursor-pointer"
              >
                {actionRejected ? 'Rejected' : 'Reject'}
              </button>
            </div>

          </div>

        </div>

        {/* Bottom 2 Columns: Timeline & Dispute Evidence Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Timeline Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Timeline</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100">
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">Source</th>
                    <th className="pb-3 font-medium">Event</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                  <tr>
                    <td className="py-3 text-slate-500">10:02:11</td>
                    <td className="py-3 text-slate-800 font-sans font-medium">Shop</td>
                    <td className="py-3 font-sans">Order created, awaiting confirmation</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-500">10:02:40</td>
                    <td className="py-3 text-blue-600 font-sans font-medium">PayPal</td>
                    <td className="py-3 font-sans">Capture COMPLETED, $84.50</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-500">10:02:41</td>
                    <td className="py-3 text-rose-600 font-sans font-medium">Webhook</td>
                    <td className="py-3 font-sans">Delivered, handler failed</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-500">10:02:56</td>
                    <td className="py-3 text-amber-600 font-sans font-medium">Webhook</td>
                    <td className="py-3 font-sans">Delivered again, no change</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Dispute Evidence Checklist */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Dispute evidence checklist</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Shown when a dispute exists. Synthetic fixture in this demo.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              
              <div 
                onClick={() => setOrderReceipt(!orderReceipt)}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3 text-xs font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={orderReceipt}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300"
                  />
                  <span>Order receipt</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Have
                </span>
              </div>

              <div 
                onClick={() => setProofOfDelivery(!proofOfDelivery)}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3 text-xs font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={proofOfDelivery}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300"
                  />
                  <span>Proof of delivery</span>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${proofOfDelivery ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-700 bg-amber-50 border-amber-200'}`}>
                  {proofOfDelivery ? 'Have' : 'Missing'}
                </span>
              </div>

              <div 
                onClick={() => setCustomerMessages(!customerMessages)}
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3 text-xs font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={customerMessages}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300"
                  />
                  <span>Customer messages</span>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${customerMessages ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-700 bg-amber-50 border-amber-200'}`}>
                  {customerMessages ? 'Have' : 'Missing'}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
