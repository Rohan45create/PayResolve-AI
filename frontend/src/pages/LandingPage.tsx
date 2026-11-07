import { useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [modalContent, setModalContent] = useState<{ title: string; category: string; description: string; items?: string[] } | null>(null);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = (title: string, category: string, description: string, items?: string[]) => {
    setModalContent({ title, category, description, items });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* ---------------- NAVIGATION ---------------- */}
      <nav className="w-full bg-[#031535] text-white border-b border-blue-900/40 sticky top-0 z-50 px-6 sm:px-12 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link to="/" className="flex items-center space-x-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-inner">
              P
            </div>
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1">
              PayResolve <span className="text-blue-400 text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-900/60 border border-blue-700/50 font-mono">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-7 text-sm font-medium text-slate-300">
            <button onClick={() => scrollToSection('features')} className="cursor-pointer text-slate-300">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="cursor-pointer text-slate-300">Architecture</button>
            <button onClick={() => scrollToSection('evidence-graph')} className="cursor-pointer text-slate-300">Evidence Graph</button>
            <button onClick={() => scrollToSection('sources')} className="cursor-pointer text-slate-300">Research</button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link 
            to="/signin"
            className="text-sm font-medium text-slate-200 px-3 py-1.5 cursor-pointer"
          >
            Sign in
          </Link>
          <Link 
            to="/signin"
            className="text-sm font-semibold bg-white text-[#031535] px-4 py-2 rounded-md shadow cursor-pointer inline-block"
          >
            Open Live Console
          </Link>
        </div>
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative bg-gradient-to-b from-[#031535] via-[#052968] to-[#0d47a1] text-white pt-16 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-blue-900/80 border border-blue-400/30 text-blue-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>PayPal Exception Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
              Customer <br />
              says paid. <br />
              System says <br />
              unpaid.
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal max-w-lg">
              PayResolve reconstructs the exact timeline across PayPal, webhooks, and your merchant database. Instant graph evidence and a read-only AI investigator so operators act with proof in seconds.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link 
                to="/signin"
                className="bg-white text-[#031535] px-5 py-3 rounded-md font-semibold text-sm shadow-lg cursor-pointer flex items-center space-x-2"
              >
                <span>Launch Demo Console</span>
                <ArrowRight className="w-4 h-4 text-blue-700" />
              </Link>
              <a 
                href="https://github.com/Skedare240507/PayResolve-AI#readme"
                target="_blank"
                rel="noreferrer"
                className="border border-blue-300/40 text-white bg-blue-950/40 px-5 py-3 rounded-md font-semibold text-sm cursor-pointer inline-flex items-center space-x-1.5"
              >
                <span>Explore Docs</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
              </a>
            </div>

            <div className="flex items-center space-x-6 text-xs text-blue-200/80 pt-4 border-t border-blue-400/20">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Deterministic rules</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-300" />
                <span>Read-only AI safety</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Zero hallucination</span>
              </div>
            </div>
          </div>

          {/* Interactive Evidence Graph visualizer */}
          <div className="lg:col-span-7">
            <div className="bg-[#0b1329] border border-blue-900/60 rounded-xl shadow-2xl p-4 sm:p-6 overflow-hidden relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-slate-400 font-mono pl-2">Timeline Evidence Visualizer: ORD-98214</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-700 text-rose-300 font-mono font-medium">DISCREPANCY DETECTED</span>
                </div>
              </div>

              <div className="py-8 px-2 sm:px-6 relative flex flex-col items-center justify-center min-h-[290px] bg-[#070d1e]/80 rounded-lg mt-3 border border-slate-800/80">
                <div className="grid grid-cols-3 gap-6 sm:gap-10 w-full items-center relative z-10">
                  <div 
                    onClick={() => openModal(
                      'Store Order Record #98214',
                      'Merchant Database',
                      'Internal PostgreSQL store record captured at initial cart completion. Status remained PENDING because the payment gateway webhook confirmation dropped in transit.',
                      ['Customer: Jane Doe', 'Amount: $189.50 USD', 'Created: 2026-11-04T12:00:22Z', 'Order Status: PENDING (Unpaid)']
                    )}
                    className="bg-[#121c38] border-2 border-blue-500/80 rounded-lg p-3 text-center cursor-pointer shadow-md"
                  >
                    <div className="text-[10px] text-blue-300 uppercase tracking-wider font-bold">Store Checkout</div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-1">Order #98214</div>
                    <div className="text-[11px] text-slate-300 font-mono mt-0.5">$189.50 USD</div>
                    <div className="mt-2 text-[10px] bg-amber-900/80 text-amber-300 px-2 py-0.5 rounded border border-amber-600 font-medium">
                      Status: PENDING
                    </div>
                  </div>

                  <div 
                    onClick={() => openModal(
                      'PayPal Capture #7XY892',
                      'PayPal Orders v2 API',
                      'Verified capture record queried live through PayPal Sandbox. Funds were successfully transferred and settled into the merchant wallet.',
                      ['PayPal Order ID: 5O190127TN364715T', 'Capture ID: 7XY8929104', 'Amount: $189.50 USD', 'PayPal State: COMPLETED']
                    )}
                    className="bg-[#10243e] border-2 border-emerald-500 rounded-lg p-3 text-center cursor-pointer shadow-md relative"
                  >
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">PayPal Sandbox</div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-1">Capture #7XY892</div>
                    <div className="text-[11px] text-emerald-200 font-mono mt-0.5">$189.50 USD</div>
                    <div className="mt-2 text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-600 font-medium">
                      Status: COMPLETED
                    </div>
                  </div>

                  <div 
                    onClick={() => openModal(
                      'Missing Webhook Event Node',
                      'Network Disconnect',
                      'The webhook dispatch PAYMENT.CAPTURE.COMPLETED was transmitted by PayPal but failed to receive a 200 OK from the merchant listener due to a transient network timeout.',
                      ['Event: PAYMENT.CAPTURE.COMPLETED', 'HTTP Response: Connection Reset (ETIMEDOUT)', 'Result: Store order mutation missed', 'Remediation: Safe Re-sync']
                    )}
                    className="bg-[#24131b] border-2 border-dashed border-rose-500/80 rounded-lg p-3 text-center cursor-pointer shadow-md"
                  >
                    <div className="text-[10px] text-rose-300 uppercase tracking-wider font-bold">Webhook Event</div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-1">PAYMENT.CAPTURE</div>
                    <div className="text-[11px] text-rose-200 font-mono mt-0.5">Dropped in transit</div>
                    <div className="mt-2 text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-600 font-medium">
                      Missing Node
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none flex items-center justify-center px-12">
                  <svg className="w-full h-24" preserveAspectRatio="none">
                    <line x1="28%" y1="50%" x2="40%" y2="50%" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                    <line x1="60%" y1="50%" x2="72%" y2="50%" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
                  </svg>
                </div>

                <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mt-6 pt-4 border-t border-slate-800">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-blue-400" /> Latency: 1.2s verification
                  </span>
                  <span className="font-mono text-emerald-400">Match score: 100% ID & Timestamp</span>
                </div>
              </div>

              <div className="mt-4 bg-[#141e34] border border-blue-500/40 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-blue-300 uppercase">AI Read-Only Investigation Report</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    "Buyer funds are fully secured under PayPal Capture ID <code className="text-blue-300 font-mono">7XY892</code>. The merchant store missed the event webhook. Recommended safe action: Sync order to <strong className="text-white">PROCESSING</strong> without charging or refunding."
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={() => openModal(
                      'Idempotent Safe Sync Execution',
                      'Human Approval Protocol',
                      'PayResolve triggers the verified internal action SYNC_ORDER_STATUS with idempotency key `sync-ord-98214-v1`. The store database safely transitions to PAID with 0 risk of duplicate charges or unexpected refunds.'
                    )}
                    className="bg-emerald-600 text-white font-semibold text-xs px-3.5 py-2 rounded shadow cursor-pointer whitespace-nowrap"
                  >
                    Execute Safe Sync
                  </button>
                  <button 
                    onClick={() => openModal(
                      'Raw Gateway Telemetry',
                      'Audit & Verification',
                      'Inspect raw HTTP JSON payload and cryptographic webhook signature headers (PayPal-Transmission-Id, PayPal-Cert-Url) validating that this event originated from official PayPal infrastructure.'
                    )}
                    className="bg-slate-800 text-slate-300 border border-slate-700 font-medium text-xs px-3 py-2 rounded cursor-pointer whitespace-nowrap"
                  >
                    Inspect
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ---------------- SECTION 2: DISPUTES ARE GROWING & EVIDENCE IS SCATTERED ---------------- */}
      <section id="features" className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Disputes are growing. The evidence is scattered.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Modern digital commerce breaks when state diverges across gateways, webhooks, fulfillment microservices, and customer support desks. Manual reconciliation is slow, error-prone, and burns merchant margins.
            </p>
            <div className="pt-2">
              <a 
                href="https://github.com/Skedare240507/PayResolve-AI/blob/main/docs/prd.md"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold text-sm inline-flex items-center space-x-1.5 cursor-pointer border-b border-blue-600 pb-0.5"
              >
                <span>Read the PayResolve PRD & Dispute Analysis</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 border-l border-slate-200 lg:pl-10">
            <div className="space-y-1.5">
              <div className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight">83.4%</div>
              <h3 className="font-semibold text-slate-900 text-sm">Discrepancies from dropped events</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Most disputes start as transient webhook drops or timing delays where payment went through but store orders remained stuck.
              </p>
              <button 
                onClick={() => openModal('83.4% Dropped Events', 'Research Finding', 'Over 80% of payment discrepancies in distributed architectures stem not from actual fraud, but from dropped network webhooks between the PSP and store checkout.')} 
                className="text-xs text-blue-600 font-medium pt-1 cursor-pointer"
              >
                View breakdown &rarr;
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight">38%</div>
              <h3 className="font-semibold text-slate-900 text-sm">Double refund rate on blind resolution</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Support agents who lack synchronized timeline graphs mistakenly refund transactions that were already fulfilled or captured.
              </p>
              <button 
                onClick={() => openModal('38% Double Refund Rate', 'Merchant Risk', 'Support operators issuing manual refunds under pressure frequently issue store credit while card claims are actively processing simultaneously.')}
                className="text-xs text-blue-600 font-medium pt-1 cursor-pointer"
              >
                View study &rarr;
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight">58%</div>
              <h3 className="font-semibold text-slate-900 text-sm">Of support tickets escalate needlessly</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Customers file claims with card issuers simply because store support takes over 24 hours to track down their transaction state.
              </p>
              <button 
                onClick={() => openModal('58% Needlessly Escalated Tickets', 'Customer Experience', 'Prolonged investigations drive customers directly to their bank to open chargebacks, incurring merchant dispute fees and penalizing seller ratings.')}
                className="text-xs text-blue-600 font-medium pt-1 cursor-pointer"
              >
                Read metrics &rarr;
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight">281.3M</div>
              <h3 className="font-semibold text-slate-900 text-sm">Annual lost GMV in disputed transactions</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Unresolved payment mismatches directly degrade seller ratings and incur high dispute penalty fees from processors.
              </p>
              <button 
                onClick={() => openModal('$281.3M Lost GMV', 'Industry Benchmark', 'Aggregate annualized chargeback fees, lost stock from duplicate re-shipments, and administrative overhead across mid-market e-commerce.')}
                className="text-xs text-blue-600 font-medium pt-1 cursor-pointer"
              >
                Economic impact &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Evidence List Rows */}
        <div className="mt-16 divide-y divide-slate-200 border-t border-b border-slate-200">
          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-3 font-semibold text-slate-900 text-sm">
              Missing webhook receipts
            </div>
            <div className="md:col-span-7 text-xs sm:text-sm text-slate-600">
              Gateway signals capture success, but network partition prevents state mutation in store database.
            </div>
            <div className="md:col-span-2 text-right">
              <button 
                onClick={() => openModal('Detector: Missing Webhook Receipts', 'Deterministic Detection Rule', 'Triggers when a PayPal Order enters COMPLETED or CAPTURED status, but the merchant order stays AWAITING_PAYMENT beyond 120 seconds.')}
                className="text-xs font-semibold px-3 py-1.5 border border-slate-300 text-slate-700 rounded cursor-pointer"
              >
                Inspect Flow
              </button>
            </div>
          </div>

          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-3 font-semibold text-slate-900 text-sm">
              Amount & currency mismatches
            </div>
            <div className="md:col-span-7 text-xs sm:text-sm text-slate-600">
              Discrepancies arising from dynamic tax calculation, currency conversions, or partial discount codes applied late.
            </div>
            <div className="md:col-span-2 text-right">
              <button 
                onClick={() => openModal('Detector: Amount & Currency Mismatches', 'Deterministic Detection Rule', 'Mathematical comparator that verifies the gross amount in PayPal capture matches the checkout invoice down to the cent.')}
                className="text-xs font-semibold px-3 py-1.5 border border-slate-300 text-slate-700 rounded cursor-pointer"
              >
                Inspect Flow
              </button>
            </div>
          </div>

          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-3 font-semibold text-slate-900 text-sm">
              Duplicate authorization attempts
            </div>
            <div className="md:col-span-7 text-xs sm:text-sm text-slate-600">
              Customers repeatedly pressing checkout creates duplicate tokens; only one gets captured while others remain pending.
            </div>
            <div className="md:col-span-2 text-right">
              <button 
                onClick={() => openModal('Detector: Duplicate Authorizations', 'Deterministic Detection Rule', 'Identifies repeated authorization tokens mapped to the same customer checkout session and automatically voids stale authorizations.')}
                className="text-xs font-semibold px-3 py-1.5 border border-slate-300 text-slate-700 rounded cursor-pointer"
              >
                Inspect Flow
              </button>
            </div>
          </div>

          <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-3 font-semibold text-slate-900 text-sm">
              Post-delivery dispute filings
            </div>
            <div className="md:col-span-7 text-xs sm:text-sm text-slate-600">
              Buyer disputes item receipt despite verified carrier tracking signature and PayPal Seller Protection eligibility.
            </div>
            <div className="md:col-span-2 text-right">
              <button 
                onClick={() => openModal('Detector: Post-Delivery Disputes', 'Deterministic Detection Rule', 'Cross-references carrier delivery API with PayPal Dispute reason. Automatically flags the case as eligible for PayPal Seller Protection.')}
                className="text-xs font-semibold px-3 py-1.5 border border-slate-300 text-slate-700 rounded cursor-pointer"
              >
                Inspect Flow
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: HOW IT WORKS (STEP-BY-STEP) ---------------- */}
      <section id="how-it-works" className="py-20 px-6 sm:px-12 lg:px-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How it works</h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              A four-tier pipeline engineered for deterministic accuracy and merchant money safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 relative">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm font-mono">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Ingest</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect PayPal Sandbox / Live webhooks, store orders, and shipping webhooks into a unified transactional inbox.
              </p>
              <button 
                onClick={() => openModal('1. Ingestion Engine', 'Core Architecture', 'Durable, append-only PostgreSQL inbox that receives webhooks, checks cryptographic signatures against PayPal certificates, and assigns globally unique event IDs.')} 
                className="text-xs text-blue-600 font-medium cursor-pointer"
              >
                Learn more &rarr;
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm font-mono">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Detect</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero-hallucination deterministic rules spot discrepancies in &lt;50ms before any AI analysis is invoked.
              </p>
              <button 
                onClick={() => openModal('2. Deterministic Detectors', 'Zero Hallucination Rules', 'Pure Java domain logic evaluates state trees (PAID_NOT_MARKED, AMOUNT_MISMATCH, DUPLICATE_EVENT). AI is never used to decide if a bug occurred.')} 
                className="text-xs text-blue-600 font-medium cursor-pointer"
              >
                View rules &rarr;
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm font-mono">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">Investigate</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                AI agent uses read-only tools to interrogate PayPal Order & Capture APIs, cross-checking every reference.
              </p>
              <button 
                onClick={() => openModal('3. Tool-Calling AI Investigator', 'Spring AI 2.0 Integration', 'The investigator is equipped exclusively with read-only tools: GetPayPalOrder, GetCaptureDetails, and QueryStoreLog. It cannot execute mutations or move money.')} 
                className="text-xs text-blue-600 font-medium cursor-pointer"
              >
                Tool specs &rarr;
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm relative space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm font-mono">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base">Approve</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Human operator reviews grounded evidence and approves one-click idempotency-guaranteed resolution actions.
              </p>
              <button 
                onClick={() => openModal('4. Human In The Loop Execution', 'Safety Protocol', 'Actions proposed by the AI must be approved by an authenticated operator. Execution employs strict idempotency keys to ensure no action repeats.')} 
                className="text-xs text-blue-600 font-medium cursor-pointer"
              >
                Safety bounds &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: ONE MAP. ONE INVESTIGATOR. PROOF FOR EVERY CLAIM. ---------------- */}
      <section id="evidence-graph" className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-br from-[#031535] via-[#082a69] to-[#0d47a1] rounded-2xl p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                One map. One investigator. Proof for every claim.
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Stop jumping across six browser tabs. PayResolve connects payment gateway records, store database entries, customer messaging, and shipping carriers into a single visual truth map.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Every node backed by raw JSON logs</h4>
                    <p className="text-xs text-blue-200">Click any node to see exact cryptographic PayPal headers and timestamps.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Zero hallucination verifier</h4>
                    <p className="text-xs text-blue-200">Every monetary sum and transaction ID cited by the AI is mathematically verified.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Human-in-the-loop controls</h4>
                    <p className="text-xs text-blue-200">AI cannot move money on its own. Operators retain full decision autonomy.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link 
                  to="/signin"
                  className="inline-block bg-white text-[#031535] font-semibold text-sm px-6 py-3 rounded-md shadow cursor-pointer"
                >
                  Explore Interactive Graph
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#060c1d] border border-blue-800/80 rounded-xl p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 font-mono">
                <span>GRAPH TOPOLOGY: DISPUTE-DISCOVERY</span>
                <span className="text-emerald-400 font-bold">100% RECONCILED</span>
              </div>

              <div className="py-6 px-4 bg-[#0a1126] rounded border border-slate-800/80 my-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="border border-blue-500 bg-blue-950/80 p-2 rounded text-center">
                    <div className="text-[10px] text-blue-300">BUYER INTENT</div>
                    <div className="text-white font-bold">PAYPAL_ORDER</div>
                  </div>
                  <div className="text-slate-500">&rarr;</div>
                  <div className="border border-emerald-500 bg-emerald-950/80 p-2 rounded text-center">
                    <div className="text-[10px] text-emerald-300">SETTLED FUNDS</div>
                    <div className="text-white font-bold">CAPTURE_COMPLETED</div>
                  </div>
                  <div className="text-slate-500">&rarr;</div>
                  <div className="border border-amber-500 bg-amber-950/80 p-2 rounded text-center">
                    <div className="text-[10px] text-amber-300">STORE SYNC</div>
                    <div className="text-white font-bold">MUTATE_ORDER</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#121a32] p-4 rounded border border-blue-900/50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Suggested Action</div>
                  <div className="text-xs text-slate-300">Sync status to "PAID" and notify fulfillment center.</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => openModal('Action Approved', 'Action Execution', 'Order status marked as PAID in merchant store. Fulfillment center notified to release package.')}
                    className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded cursor-pointer"
                  >
                    Confirm & Execute
                  </button>
                  <button 
                    onClick={() => openModal('Action Dismissed', 'Operator Override', 'Action proposal dismissed. Operator can add a custom note to the audit log.')}
                    className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: THREE PAYMENTS THAT GO WRONG ---------------- */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Three payments that go wrong
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every day, e-commerce stores encounter these silent failure modes that result in bad reviews, chargebacks, and double refunds.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="border-l-4 border-rose-500 pl-4 py-1 space-y-1">
              <h3 className="font-bold text-slate-900 text-base">1. Paid but marked pending</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The customer receives PayPal confirmation email and their card is charged $140. Due to a server timeout on the merchant webhook listener, the cart stays "Awaiting Payment".
              </p>
              <button 
                onClick={() => openModal('Incident: Paid But Marked Pending', 'Case Study #1', 'Root cause: PayPal webhook dropped due to an edge proxy timeout. Solution: PayResolve queries the Orders v2 API, verifies the capture ID, and executes an idempotent store status update.')}
                className="text-xs text-blue-600 font-semibold cursor-pointer"
              >
                View incident timeline &rarr;
              </button>
            </div>

            <div className="border-l-4 border-amber-500 pl-4 py-1 space-y-1">
              <h3 className="font-bold text-slate-900 text-base">2. Tax and currency discrepancy</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                An international checkout calculates VAT after the PayPal approval token was created. The captured amount ($112.00) differs from order record ($100.00), halting fulfillment.
              </p>
              <button 
                onClick={() => openModal('Incident: Tax & Currency Discrepancy', 'Case Study #2', 'Root cause: Multi-currency checkout re-calculated tax after buyer authorization. Solution: Mathematical verifier parses line-item breakdown to ensure currency and tax alignment before release.')}
                className="text-xs text-blue-600 font-semibold cursor-pointer"
              >
                View incident timeline &rarr;
              </button>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-1 space-y-1">
              <h3 className="font-bold text-slate-900 text-base">3. Phantom refund request</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A customer asks support for a refund after initiating a chargeback on PayPal. The support agent risks issuing a store credit refund while PayPal simultaneously debits the account.
              </p>
              <button 
                onClick={() => openModal('Incident: Phantom Refund Request', 'Case Study #3', 'Root cause: Support desk is unaware of open PayPal dispute. Solution: PayResolve integrates Disputes API to immediately hold internal refunds while an external dispute is active.')}
                className="text-xs text-blue-600 font-semibold cursor-pointer"
              >
                View incident timeline &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 6: WHY WE CHOSE THIS PROBLEM ---------------- */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why we chose this problem</h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Payments are the economic lifeblood of the web. Unifying evidence with deterministic verification and AI investigation solves a real-world merchant dilemma.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">
            <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Evaluation Criteria</th>
                    <th className="py-3 px-4">Traditional Tooling</th>
                    <th className="py-3 px-4 text-blue-700">PayResolve AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-800">Resolution Time</td>
                    <td className="py-3 px-4">15–30 minutes manual per ticket</td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">&lt; 15 seconds automated</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-800">Evidence Graph</td>
                    <td className="py-3 px-4">Scattered across 4 browser tabs</td>
                    <td className="py-3 px-4 font-semibold text-blue-600">Unified directed graph</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-800">AI Safety Bound</td>
                    <td className="py-3 px-4">Generic unregulated chat bot</td>
                    <td className="py-3 px-4 font-semibold text-blue-600">Strict read-only tools + Verifier</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-800">Money Movement</td>
                    <td className="py-3 px-4">Blind human refunds</td>
                    <td className="py-3 px-4 font-semibold text-blue-600">Human-approved idempotency</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-800">Integration</td>
                    <td className="py-3 px-4">Fragmented logs & spreadsheets</td>
                    <td className="py-3 px-4 font-semibold text-blue-600">Live PayPal Orders v2 & Webhooks</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">The Core Philosophy</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                "AI shouldn't be granted unsupervised authority to move money or trigger refunds. But AI is exceptionally suited to investigate, extract transaction telemetry, parse payload headers, and synthesize a grounded case file with complete mathematical citations."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-800">PayPal AI Hackathon 2026</span>
                <span className="font-mono text-blue-600">Grounded Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 7: SOURCES AND REFERENCES ---------------- */}
      <section id="sources" className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sources and references</h2>
          <p className="text-slate-600 text-sm">
            Primary developer documentation, PayPal specifications, and academic dispute benchmarks utilized in this implementation.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <div className="p-4 rounded-md border border-slate-200 bg-white flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-600 font-semibold">[1] PayPal Developer Platform</span>
              <p className="text-xs sm:text-sm font-medium text-slate-800">Orders v2 API & Webhooks Verification Standard</p>
            </div>
            <a 
              href="https://developer.paypal.com/docs/api/orders/v2/" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 flex items-center space-x-1 cursor-pointer"
            >
              <span>developer.paypal.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-4 rounded-md border border-slate-200 bg-white flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-600 font-semibold">[2] Spring AI 2.0 Reference</span>
              <p className="text-xs sm:text-sm font-medium text-slate-800">Model Context Protocol (MCP) & Read-Only Tool Execution Safe Bounds</p>
            </div>
            <a 
              href="https://docs.spring.io/spring-ai/reference/" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 flex items-center space-x-1 cursor-pointer"
            >
              <span>docs.spring.io</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-4 rounded-md border border-slate-200 bg-white flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-600 font-semibold">[3] Project Architecture & Rules</span>
              <p className="text-xs sm:text-sm font-medium text-slate-800">Grounded Evidence Graphs & Exception State Life Cycle Specification</p>
            </div>
            <a 
              href="https://github.com/Skedare240507/PayResolve-AI/blob/main/docs/architecture.md" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 flex items-center space-x-1 cursor-pointer"
            >
              <span>github.com/PayResolve-AI/docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-4 rounded-md border border-slate-200 bg-white flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-600 font-semibold">[4] MIT License Repository</span>
              <p className="text-xs sm:text-sm font-medium text-slate-800">Official Open Source Hackathon Codebase & Integration Harness</p>
            </div>
            <a 
              href="https://github.com/Skedare240507/PayResolve-AI" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold text-blue-600 flex items-center space-x-1 cursor-pointer"
            >
              <span>github.com/Skedare240507/PayResolve-AI</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 8: BOTTOM CTA BANNER ---------------- */}
      <section className="py-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-[#031535] via-[#093582] to-[#0d47a1] rounded-2xl p-8 sm:p-14 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              See a broken payment explained in under a minute.
            </h2>
            <p className="text-blue-200 text-sm sm:text-base">
              Test live across PayPal Sandbox orders, simulated dropped webhooks, and AI reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link 
              to="/signin"
              className="bg-white text-[#031535] font-bold text-sm px-6 py-3.5 rounded-md shadow-lg cursor-pointer inline-block"
            >
              Launch Live Demo
            </Link>
            <a 
              href="https://github.com/Skedare240507/PayResolve-AI" 
              target="_blank" 
              rel="noreferrer"
              className="border border-blue-300/40 bg-blue-950/40 text-white font-semibold text-sm px-5 py-3.5 rounded-md cursor-pointer inline-flex items-center space-x-1.5"
            >
              <span>View GitHub Repo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- WORKING MODAL ---------------- */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {modalContent.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{modalContent.title}</h3>
              </div>
              <button 
                onClick={() => setModalContent(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {modalContent.description}
            </p>

            {modalContent.items && modalContent.items.length > 0 && (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5 font-mono text-xs">
                {modalContent.items.map((item, idx) => (
                  <div key={idx} className="text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-md cursor-pointer"
              >
                Close Dialog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- FOOTER WITH WORKING LINKS ---------------- */}
      <footer className="bg-[#f8fafc] border-t border-slate-200 py-16 px-6 sm:px-12 lg:px-20 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                P
              </div>
              <span className="font-bold text-base text-slate-900 tracking-tight">PayResolve AI</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              Merchant-side investigation engine for PayPal payment exceptions. Combining deterministic discrepancy detectors with a tool-calling AI investigator and source-linked evidence graphs.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[11px]">
                PayPal AI Hackathon 2026 Submission
              </span>
            </div>
          </div>

          <div>
            <div className="font-bold text-slate-900 text-sm mb-3">Product</div>
            <ul className="space-y-2">
              <li><Link to="/signin" className="cursor-pointer text-slate-600 hover:text-blue-600">Live Console</Link></li>
              <li><button onClick={() => scrollToSection('evidence-graph')} className="cursor-pointer text-slate-600 hover:text-blue-600">Evidence Graph</button></li>
              <li><button onClick={() => openModal('Rule Detectors', 'Architecture', 'Deterministic rules inspect payment state transitions in <50ms without AI hallucinations.')} className="cursor-pointer text-slate-600 hover:text-blue-600">Rule Detectors</button></li>
              <li><button onClick={() => openModal('Verifier Engine', 'Architecture', 'Deterministic verifier that audits citations and monetary sums produced by the AI against real database records.')} className="cursor-pointer text-slate-600 hover:text-blue-600">Verifier Engine</button></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-slate-900 text-sm mb-3">Architecture</div>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/Skedare240507/PayResolve-AI/tree/main/backend" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cursor-pointer text-slate-600 hover:text-blue-600 flex items-center gap-1"
                >
                  <span>Spring Boot API</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.spring.io/spring-ai/reference/api/chatclient.html" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cursor-pointer text-slate-600 hover:text-blue-600 flex items-center gap-1"
                >
                  <span>Spring AI Read Tools</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://developer.paypal.com/docs/api/orders/v2/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cursor-pointer text-slate-600 hover:text-blue-600 flex items-center gap-1"
                >
                  <span>PayPal Sandbox</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Skedare240507/PayResolve-AI/tree/main/backend/src/main/resources/db/migration" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cursor-pointer text-slate-600 hover:text-blue-600 flex items-center gap-1"
                >
                  <span>PostgreSQL Schema</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-slate-900 text-sm mb-3">Governance</div>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => openModal('Read-Only Safety Bounds', 'Security Governance', 'The AI investigator is prohibited from calling mutation endpoints. It only holds read-only inspection access.')} 
                  className="cursor-pointer text-slate-600 hover:text-blue-600"
                >
                  Read-Only Safety Bounds
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openModal('Human Approval Protocol', 'Security Governance', 'Every action proposal requires manual human confirmation with cryptographic idempotency keys before executing on store or PayPal endpoints.')} 
                  className="cursor-pointer text-slate-600 hover:text-blue-600"
                >
                  Human Approval Protocol
                </button>
              </li>
              <li>
                <a 
                  href="https://github.com/Skedare240507/PayResolve-AI/blob/main/LICENSE" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cursor-pointer text-slate-600 hover:text-blue-600 flex items-center gap-1"
                >
                  <span>MIT License</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://paypalaihackathon.devpost.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="cursor-pointer text-slate-600 hover:text-blue-600 flex items-center gap-1"
                >
                  <span>Devpost Submission</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
          <div>
            &copy; 2026 PayResolve AI. Built for the PayPal AI Hackathon.
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => openModal('Privacy Notice', 'Compliance', 'PayResolve AI operates strictly on synthetic, clearly-labelled sandbox data. No real cardholder PANs or customer PII are processed or retained.')} 
              className="cursor-pointer hover:text-slate-700"
            >
              Privacy Notice
            </button>
            <button 
              onClick={() => openModal('Terms of Service', 'Compliance', 'Open-source software provided under the MIT License for hackathon evaluation and demonstration purposes.')} 
              className="cursor-pointer hover:text-slate-700"
            >
              Terms of Service
            </button>
            <a 
              href="https://github.com/Skedare240507/PayResolve-AI" 
              target="_blank" 
              rel="noreferrer" 
              className="cursor-pointer hover:text-slate-700"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
