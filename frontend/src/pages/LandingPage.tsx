import { Link } from 'react-router-dom';
import { PayResolveMark, PayResolveLogo } from '../components/PayResolveLogo';
import { ThemeToggle } from '../components/ThemeToggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#070b12] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* ────────────────── TOP NAVIGATION BAR ────────────────── */}
      <nav className="w-full bg-[#031535] text-white border-b border-blue-900/40 sticky top-0 z-50 px-6 sm:px-12 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link to="/" className="flex items-center space-x-2.5 cursor-pointer">
            <PayResolveMark size={28} />
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              PayResolve
              <span className="text-[11px] font-semibold px-1.5 py-0.2 rounded bg-blue-500 text-white font-mono shadow-xs">
                AI
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-7 text-xs sm:text-sm font-normal text-slate-300">
            <a href="#risk" className="hover:text-white transition-colors">Market risk</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#product" className="hover:text-white transition-colors">The product</a>
            <a href="#sources" className="hover:text-white transition-colors">Sources</a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link
            to="/signin"
            className="text-xs sm:text-sm font-medium text-slate-200 hover:text-white px-2 py-1.5 transition-colors cursor-pointer"
          >
            Sign in
          </Link>
          <Link
            to="/queue"
            className="text-xs sm:text-sm font-medium bg-white text-slate-900 hover:bg-slate-100 active:scale-[0.98] px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer inline-block"
          >
            Open workspace
          </Link>
        </div>
      </nav>

      {/* ────────────────── HERO SECTION ────────────────── */}
      <section className="bg-[#031535] text-white pt-12 pb-20 px-6 sm:px-12 lg:px-20 overflow-hidden relative border-b border-blue-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs text-blue-200/80 font-normal">
              PayPal AI Hackathon 2026. Sandbox build.
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white">
              Customer<br />
              says paid.<br />
              System says<br />
              unpaid.
            </h1>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal max-w-lg">
              PayResolve puts every PayPal event, order, refund and shipment on one evidence map, then lets an AI investigator explain what is confirmed and what is missing. You approve every fix.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/queue"
                className="bg-white text-slate-900 px-5 py-2.5 rounded-lg font-medium text-sm shadow-md hover:bg-slate-100 active:scale-[0.98] transition-all cursor-pointer"
              >
                Open workspace
              </Link>
              <a
                href="#how-it-works"
                className="border border-white/40 text-white hover:bg-white/10 active:scale-[0.98] px-5 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Right Hero Graphic: Case PR-0142 Workspace Mockup */}
          <div className="lg:col-span-6">
            <div className="bg-[#090e17] rounded-2xl border border-slate-800 p-5 shadow-2xl relative space-y-4">
              
              {/* Top window dots and title */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <span className="text-[11px] text-slate-400 font-mono ml-2">Case PR-0142 &middot; Evidence graph</span>
                </div>
              </div>

              {/* Graphic nodes canvas */}
              <div className="relative w-full h-[260px] bg-[#0c121e] rounded-xl border border-slate-800/80 p-4 overflow-hidden flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 80 130 L 150 90" stroke="#334155" strokeWidth="1.5" fill="none" />
                  <path d="M 80 130 L 150 170" stroke="#334155" strokeWidth="1.5" fill="none" />
                  <path d="M 180 115 L 180 155" stroke="#334155" strokeWidth="1.5" fill="none" />
                  <path d="M 230 90 L 300 120" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                  <path d="M 230 170 L 300 190" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                </svg>

                {/* PayPal order */}
                <div className="absolute left-4 top-28 bg-[#151d2c] border border-slate-700/80 rounded-lg p-2 text-left text-white">
                  <div className="text-[10px] font-semibold">PayPal order</div>
                  <div className="text-[9px] text-slate-400">approved</div>
                </div>

                {/* Capture */}
                <div className="absolute left-36 top-10 bg-[#151d2c] border border-blue-500 rounded-lg p-2 text-left text-white">
                  <div className="text-[10px] font-semibold">Capture</div>
                  <div className="text-[9px] text-slate-400">COMPLETED, $84.50</div>
                </div>

                {/* Webhook */}
                <div className="absolute left-36 bottom-10 bg-[#151d2c] border border-slate-700/80 rounded-lg p-2 text-left text-white">
                  <div className="text-[10px] font-semibold">Webhook</div>
                  <div className="text-[9px] text-slate-400">delivered twice</div>
                </div>

                {/* Label */}
                <div className="absolute left-64 top-20 text-[9px] text-amber-400 font-mono">
                  missing: PAID update
                </div>

                {/* Shop order */}
                <div className="absolute right-4 top-20 bg-[#151d2c] border border-amber-600/80 rounded-lg p-2.5 text-left text-white">
                  <div className="text-[10px] font-semibold">Shop order #10482</div>
                  <div className="text-[9px] text-amber-400">still PENDING</div>
                </div>

                {/* No shipment yet */}
                <div className="absolute right-4 bottom-8 border border-dashed border-slate-600 rounded-lg p-2 text-left text-slate-400 text-[9px]">
                  No shipment yet
                </div>
              </div>

              {/* Pill buttons bottom */}
              <div className="flex items-center space-x-2 pt-1 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded-full border border-blue-500/40 bg-blue-950/40 text-blue-300">
                  getPayPalOrder 212 ms
                </span>
                <span className="px-2 py-0.5 rounded-full border border-blue-500/40 bg-blue-950/40 text-blue-300">
                  getShopOrder 38 ms
                </span>
              </div>

              {/* Floating AI investigator card */}
              <div className="bg-[#111827] border border-slate-700/80 rounded-xl p-4 shadow-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">AI investigator</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/60 text-emerald-400">
                    3 of 3 verified
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1">
                  <div><span className="font-semibold text-emerald-400">Confirmed:</span> capture COMPLETED, $84.50.</div>
                  <div><span className="font-semibold text-amber-400">Missing:</span> status update after the webhook.</div>
                  <div className="text-slate-400"><span className="font-semibold text-blue-400">Proposed:</span> sync order status. Awaiting approval.</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ────────────────── SECTION: MARKET RISK ────────────────── */}
      <section id="risk" className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Disputes are growing. The evidence is scattered.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Recent industry research points one way: more disputes, thin teams, and AI-initiated purchases with no settled rules. These are vendor and trade-body surveys, quoted as published.
            </p>
          </div>

          {/* Right Column: 4 Stat Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Stat 1 */}
              <div className="space-y-1 pb-4 border-b sm:border-b-0 border-slate-200 dark:border-slate-800">
                <div className="text-4xl sm:text-5xl font-black text-[#0066cc]">83.4%</div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  of enterprise merchants report friendly fraud rising over three years.
                </div>
                <a href="https://chargebacks911.com/2026-chargeback-field-report/" target="_blank" rel="noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-block pt-1">
                  Chargebacks911 &nearr;
                </a>
              </div>

              {/* Stat 2 */}
              <div className="space-y-1 pb-4 border-b sm:border-b-0 border-slate-200 dark:border-slate-800">
                <div className="text-4xl sm:text-5xl font-black text-[#0066cc]">38%</div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  of merchants say chargeback costs now influence what they charge.
                </div>
                <a href="https://greensheet.com/newswire/article_id=64300" target="_blank" rel="noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-block pt-1">
                  The Green Sheet &nearr;
                </a>
              </div>

              {/* Stat 3 */}
              <div className="space-y-1 pb-4 border-b sm:border-b-0 border-slate-200 dark:border-slate-800">
                <div className="text-4xl sm:text-5xl font-black text-[#0066cc]">58%</div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  of UK online merchants believe AI-initiated purchases already reach them.
                </div>
                <a href="https://www.retailgazette.co.uk/blog/2026/05/uk-retailers-warn-over-rising-ai-shopping-risks/" target="_blank" rel="noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-block pt-1">
                  Retail Gazette &nearr;
                </a>
              </div>

              {/* Stat 4 */}
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-[#0066cc]">281.3M</div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  global chargebacks estimated for 2026, from Mastercard and Datos data.
                </div>
                <a href="https://www.chargeback.io/blog/chargeback-statistics" target="_blank" rel="noreferrer" className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-block pt-1">
                  Chargeback.io &nearr;
                </a>
              </div>

            </div>

            {/* 4 Article Citations */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 pt-6">
              
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="w-32 shrink-0 text-slate-500 dark:text-slate-400">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">Chargebacks911</div>
                  <div>30 Jun 2026</div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white">Friendly fraud keeps climbing for large merchants</div>
                  <div className="text-slate-500 dark:text-slate-400">About one in four teams uses five or more separate tools just to investigate disputes.</div>
                </div>
                <a href="https://chargebacks911.com/2026-chargeback-field-report/" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline shrink-0">
                  Read &nearr;
                </a>
              </div>

              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="w-32 shrink-0 text-slate-500 dark:text-slate-400">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">eCommerceNews Asia</div>
                  <div>2 Jul 2026</div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white">Most merchants have no dedicated dispute team</div>
                  <div className="text-slate-500 dark:text-slate-400">Only about a third report a chargeback lead, and few track the card-network records behind their VAMP ratio.</div>
                </div>
                <a href="https://ecommercenews.asia/story/friendly-fraud-drives-up-merchant-costs-report-finds" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline shrink-0">
                  Read &nearr;
                </a>
              </div>

              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="w-32 shrink-0 text-slate-500 dark:text-slate-400">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">Forkast</div>
                  <div>Analysis</div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white">Who pays when the AI agent buys wrong?</div>
                  <div className="text-slate-500 dark:text-slate-400">Agent payment protocols do not reallocate liability for non-fraud errors, and a draft EMVCo framework leaves it open.</div>
                </div>
                <a href="https://forkast.news/the-agentic-commerce-liability-gap-who-pays-when-the-agent-buys-wrong/" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline shrink-0">
                  Read &nearr;
                </a>
              </div>

              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="w-32 shrink-0 text-slate-500 dark:text-slate-400">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">The Paypers</div>
                  <div>24 Jun 2026</div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white">Disputes and friendly fraud in the age of agentic commerce</div>
                  <div className="text-slate-500 dark:text-slate-400">A Juniper Research analyst describes a regulatory grey area and a missing source of truth for agent-led purchases.</div>
                </div>
                <a href="https://thepaypers.com/payments/expert-views/disputes-and-friendly-fraud-in-the-age-of-agentic-commerce" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline shrink-0">
                  Read &nearr;
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ────────────────── SECTION: HOW IT WORKS ────────────────── */}
      <section id="how-it-works" className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-10 border-t border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">How it works</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Rules detect. AI investigates. Humans decide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mb-4" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">1. Ingest</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Signed PayPal webhooks land in a durable inbox. Duplicates are ignored.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mb-4" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">2. Detect</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Deterministic rules flag paid-not-marked, amount mismatch and duplicates.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mb-4" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">3. Investigate</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              An agent queries PayPal live with read-only tools and cites every record.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mb-4" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">4. Approve</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              It proposes a safe action. An operator approves and the audit log records it.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────── SECTION: THE PRODUCT BANNER ────────────────── */}
      <section id="product" className="py-12 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="bg-[#0b5cd5] dark:bg-[#0c47aa] rounded-3xl p-8 sm:p-14 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                One map. One investigator. Proof for every claim.
              </h2>
              <p className="text-sm text-blue-100 leading-relaxed">
                Open any broken payment and see everything that touched it. Click Investigate and watch the agent query PayPal and your records, then answer in plain language.
              </p>

              <div className="space-y-4 pt-2 text-xs sm:text-sm">
                <div>
                  <h3 className="font-bold text-white">Every statement cites a record</h3>
                  <p className="text-blue-100 text-xs">Links go to the exact capture, event or order.</p>
                </div>
                <div>
                  <h3 className="font-bold text-white">A verifier checks the AI</h3>
                  <p className="text-blue-100 text-xs">Record ids and amounts are validated before you see them.</p>
                </div>
                <div>
                  <h3 className="font-bold text-white">It admits when it does not know</h3>
                  <p className="text-blue-100 text-xs">"Cause not determined" beats a confident guess.</p>
                </div>
              </div>
            </div>

            {/* Inner Mockup Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#090e17] rounded-2xl border border-slate-700/80 p-5 shadow-2xl relative space-y-4 text-xs">
                <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono pb-2 border-b border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                  <span className="ml-2">Case PR-0142</span>
                </div>

                <div className="relative w-full h-44 bg-[#0c121e] rounded-xl border border-slate-800 p-3 overflow-hidden flex items-center justify-center">
                  <div className="text-[10px] text-slate-400">Interactive graph evidence workspace</div>
                </div>

                {/* Floating Report */}
                <div className="bg-white dark:bg-[#131b26] rounded-xl p-4 shadow-xl text-slate-900 dark:text-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Report</span>
                    <span className="px-2 py-0.5 rounded-full border border-emerald-500/60 text-emerald-600 dark:text-emerald-400 text-[10px]">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-rose-600 dark:text-rose-400">Conflict:</strong> shop order still PENDING after capture.
                  </p>
                  <div className="flex items-center space-x-2 pt-1">
                    <button className="px-4 py-1.5 rounded-lg bg-[#0066cc] text-white font-medium text-xs">
                      Approve sync
                    </button>
                    <button className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────── SECTION: THREE PAYMENTS THAT GO WRONG ────────────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-10 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Three payments that go wrong
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              PayPal, the order system, refunds and delivery each hold a piece. When they disagree, someone rebuilds the story by hand.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6 text-xs sm:text-sm">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white">Paid, but marked unpaid</h3>
              <p className="text-slate-600 dark:text-slate-400">
                A customer pays $84.50. The server crashes mid-webhook and order #10482 stays pending. Asking them to pay again would double-charge them.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white">The webhook that arrived twice</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Without idempotency the order ships twice. PayResolve proves exactly one business action ran.
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white">Where is my refund?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Requested, pending and completed look identical to a customer. It separates them before anyone refunds twice.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ────────────────── SECTION: WHY WE CHOSE THIS PROBLEM ────────────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-10 border-t border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Why we chose this problem
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Judging Table */}
          <div className="lg:col-span-7 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 pr-4 font-normal text-xs">Judging criterion</th>
                  <th className="py-2.5 pl-4 font-normal text-xs">How PayResolve answers it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-slate-900 dark:text-white text-xs">Technological implementation</td>
                  <td className="py-3.5 pl-4 text-slate-600 dark:text-slate-400 text-xs">
                    Real Sandbox capture, signed webhooks, idempotency, tool-calling AI with a verifier
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-slate-900 dark:text-white text-xs">Design</td>
                  <td className="py-3.5 pl-4 text-slate-600 dark:text-slate-400 text-xs">
                    Queue, case, graph, approve: one complete operator workflow
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-slate-900 dark:text-white text-xs">Potential impact</td>
                  <td className="py-3.5 pl-4 text-slate-600 dark:text-slate-400 text-xs">
                    Daily merchant pain with real cost: double charges, double refunds, missed disputes
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-slate-900 dark:text-white text-xs">Innovation</td>
                  <td className="py-3.5 pl-4 text-slate-600 dark:text-slate-400 text-xs">
                    Provenance and safe actions, not a risk score or a chatbot
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-semibold text-slate-900 dark:text-white text-xs">Presentation</td>
                  <td className="py-3.5 pl-4 text-slate-600 dark:text-slate-400 text-xs">
                    One story: paid, but the system says unpaid
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Why Now */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Why now</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              AI agents are starting to buy things for customers, and nobody has settled who is liable when they get it wrong. Merchants will need records they can trust. Read the{' '}
              <a href="https://forkast.news/the-agentic-commerce-liability-gap-who-pays-when-the-agent-buys-wrong/" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                Forkast analysis &nearr;
              </a>
              , and why agent-led disputes lack a source of truth in{' '}
              <a href="https://www.chargeflow.io/blog/ai-agent-chargeback-liability" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                Chargeflow &nearr;
              </a>{' '}
              and{' '}
              <a href="https://thepaypers.com/payments/expert-views/disputes-and-friendly-fraud-in-the-age-of-agentic-commerce" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                The Paypers &nearr;
              </a>
              .
            </p>
          </div>

        </div>
      </section>

      {/* ────────────────── SECTION: SOURCES AND REFERENCES ────────────────── */}
      <section id="sources" className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6 border-t border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Sources and references
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Every figure on this page comes from the articles below.
          </p>
        </div>

        <ol className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 list-decimal list-inside leading-relaxed">
          <li>
            Chargebacks911, 2026 Chargeback Field Report, 30 Jun 2026{' '}
            <a href="https://chargebacks911.com/2026-chargeback-field-report/" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
              https://chargebacks911.com/2026-chargeback-field-report/
            </a>
          </li>
          <li>
            The Green Sheet, Chargebacks are quietly raising prices, 28 Jul 2026{' '}
            <a href="https://greensheet.com/newswire/article_id=64300" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
              https://greensheet.com/newswire/article_id=64300
            </a>
          </li>
          <li>
            eCommerceNews Asia, Friendly fraud drives up merchant costs, 2 Jul 2026{' '}
            <a href="https://ecommercenews.asia/story/friendly-fraud-drives-up-merchant-costs-report-finds" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
              https://ecommercenews.asia/story/friendly-fraud-drives-up-merchant-costs-report-finds
            </a>
          </li>
          <li>
            Retail Gazette, UK retailers raise concerns over agentic AI shopping risks, May 2026{' '}
            <a href="https://www.retailgazette.co.uk/blog/2026/05/uk-retailers-warn-over-rising-ai-shopping-risks/" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
              https://www.retailgazette.co.uk/blog/2026/05/uk-retailers-warn-over-rising-ai-shopping-risks/
            </a>
          </li>
          <li>
            Forkast, The agentic commerce liability gap{' '}
            <a href="https://forkast.news/the-agentic-commerce-liability-gap-who-pays-when-the-agent-buys-wrong/" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
              https://forkast.news/the-agentic-commerce-liability-gap-who-pays-when-the-agent-buys-wrong/
            </a>
          </li>
          <li>
            The Paypers, Disputes and friendly fraud in the age of agentic commerce, 24 Jun 2026{' '}
            <a href="https://thepaypers.com/payments/expert-views/disputes-and-friendly-fraud-in-the-age-of-agentic-commerce" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
              https://thepaypers.com/payments/expert-views/disputes-and-friendly-fraud-in-the-age-of-agentic-commerce
            </a>
          </li>
          <li>
            Chargeflow, AI agent chargeback liability, 7 Jul 2026{' '}
            <a href="https://www.chargeflow.io/blog/ai-agent-chargeback-liability" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
              https://www.chargeflow.io/blog/ai-agent-chargeback-liability
            </a>
          </li>
          <li>
            Chargeback.io, Chargeback statistics 2026{' '}
            <a href="https://www.chargeback.io/blog/chargeback-statistics" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
              https://www.chargeback.io/blog/chargeback-statistics
            </a>
          </li>
        </ol>
      </section>

      {/* ────────────────── SECTION: BOTTOM CTA BANNER ────────────────── */}
      <section className="py-12 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="bg-[#0b5cd5] dark:bg-[#0c47aa] rounded-3xl p-10 sm:p-14 text-white space-y-6 shadow-xl">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              See a broken payment explained in under a minute.
            </h2>
            <p className="text-sm text-blue-100">
              Real Sandbox payments. Real webhooks. No real money.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/queue"
              className="bg-white text-slate-900 px-5 py-2.5 rounded-lg font-medium text-sm shadow-md hover:bg-slate-100 active:scale-[0.98] transition-all cursor-pointer"
            >
              Open workspace
            </Link>
            <Link
              to="/signin"
              className="bg-transparent border border-white/50 text-white hover:bg-white/10 active:scale-[0.98] px-5 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────── FOOTER ────────────────── */}
      <footer className="bg-white dark:bg-[#05080f] border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 px-6 sm:px-12 lg:px-20 text-xs text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            
            {/* Left Brand Col (2 cols wide) */}
            <div className="lg:col-span-2 space-y-4">
              <PayResolveLogo markSize={26} />
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                Investigate PayPal payment exceptions with evidence you can trust. AI proposes, humans approve.
              </p>
              <div>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-emerald-500/50 bg-white dark:bg-[#071d18] text-emerald-700 dark:text-emerald-400 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Sandbox only. No real money.</span>
                </span>
              </div>
            </div>

            {/* Product Col */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs">Product</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/queue" className="hover:underline">Exception queue</Link></li>
                <li><Link to="/case/PR-0142" className="hover:underline">Case workspace</Link></li>
                <li><Link to="/events" className="hover:underline">Event inbox</Link></li>
                <li><Link to="/shop" className="hover:underline">Demo shop</Link></li>
                <li><Link to="/actions" className="hover:underline">Actions</Link></li>
                <li><Link to="/benchmark" className="hover:underline">Benchmark</Link></li>
              </ul>
            </div>

            {/* Project Col */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs">Project</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#how-it-works" className="hover:underline">Product requirements</a></li>
                <li><a href="#how-it-works" className="hover:underline">Architecture</a></li>
                <li><a href="#how-it-works" className="hover:underline">Build phases</a></li>
                <li><a href="#how-it-works" className="hover:underline">Engineering rules</a></li>
                <li><a href="https://github.com/Skedare240507/PayResolve-AI" target="_blank" rel="noreferrer" className="hover:underline">GitHub repository</a></li>
              </ul>
            </div>

            {/* Hackathon Col */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs">Hackathon</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="https://devpost.com" target="_blank" rel="noreferrer" className="hover:underline">PayPal AI Hackathon &nearr;</a></li>
                <li><a href="https://devpost.com" target="_blank" rel="noreferrer" className="hover:underline">Official rules &nearr;</a></li>
                <li><a href="https://devpost.com" target="_blank" rel="noreferrer" className="hover:underline">Project gallery &nearr;</a></li>
              </ul>
            </div>

            {/* Research Col */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs">Research</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="https://chargebacks911.com/2026-chargeback-field-report/" target="_blank" rel="noreferrer" className="hover:underline">2026 Chargeback Field Report &nearr;</a></li>
                <li><a href="https://www.chargeback.io/blog/chargeback-statistics" target="_blank" rel="noreferrer" className="hover:underline">Chargeback statistics &nearr;</a></li>
                <li><a href="https://forkast.news/the-agentic-commerce-liability-gap-who-pays-when-the-agent-buys-wrong/" target="_blank" rel="noreferrer" className="hover:underline">Agentic liability gap &nearr;</a></li>
              </ul>
            </div>

          </div>

          {/* Legal / Copyright Line */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 space-y-3 text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>&copy; 2026 PayResolve AI. MIT licensed. Built for the PayPal AI Hackathon.</div>
              <div className="flex items-center space-x-3">
                <a href="#sources" className="hover:underline">Privacy</a>
                <span>&middot;</span>
                <a href="#sources" className="hover:underline">Security</a>
                <span>&middot;</span>
                <a href="https://github.com/Skedare240507/PayResolve-AI/blob/main/LICENSE" target="_blank" rel="noreferrer" className="hover:underline">Licence</a>
                <span>&middot;</span>
                <Link to="/status" className="hover:underline">Status</Link>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-4xl">
              PayResolve AI is an independent hackathon project. It is not affiliated with, endorsed by or sponsored by PayPal, Inc. PayPal is a trademark of PayPal, Inc. All payment data shown is synthetic Sandbox data.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
