import { useState } from 'react';
import { 
  Inbox, 
  Share2, 
  Radio, 
  ShoppingBag, 
  CheckCircle2, 
  BarChart3, 
  Play
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface CaseItem {
  id: string;
  type: string;
  order: string;
  amount: string;
  severity: 'High' | 'Medium' | 'Low';
  age: string;
  status: 'Open' | 'Investigating' | 'Proposed' | 'Resolved';
}

const initialCases: CaseItem[] = [
  { id: 'PR-0142', type: 'Paid, not marked', order: '#10482', amount: '$84.50', severity: 'High', age: '4 min', status: 'Open' },
  { id: 'PR-0141', type: 'Amount mismatch', order: '#10479', amount: '$84.50 vs $79.50', severity: 'High', age: '12 min', status: 'Investigating' },
  { id: 'PR-0140', type: 'Duplicate event', order: '#10477', amount: '$32.00', severity: 'Medium', age: '21 min', status: 'Proposed' },
  { id: 'PR-0138', type: 'Refund mismatch', order: '#10470', amount: '$18.00', severity: 'Medium', age: '38 min', status: 'Open' },
  { id: 'PR-0137', type: 'Orphan capture', order: '#n/a', amount: '$120.00', severity: 'Medium', age: '1 h', status: 'Open' },
  { id: 'PR-0135', type: 'Paid, not marked', order: '#10466', amount: '$56.20', severity: 'Low', age: '2 h', status: 'Resolved' },
];

export default function ExceptionQueuePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [runningDetectors, setRunningDetectors] = useState(false);

  const filteredCases = initialCases.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.order.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'All' || c.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleRunDetectors = () => {
    setRunningDetectors(true);
    setTimeout(() => {
      setRunningDetectors(false);
      alert('Detectors executed: 6 discrepancies re-evaluated across PayPal Orders v2 & webhook log.');
    }, 900);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Case,Type,Order,Amount,Severity,Age,Status"].concat(
        filteredCases.map(c => `${c.id},"${c.type}",${c.order},"${c.amount}",${c.severity},${c.age},${c.status}`)
      ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payresolve_exception_queue.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex font-sans selection:bg-blue-100">
      
      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 p-5 hidden md:flex">
        <div className="space-y-8">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-inner">
              P
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1">
              PayResolve <span className="text-blue-600 text-xs font-semibold px-1 py-0.5 rounded bg-blue-50 border border-blue-200 font-mono">AI</span>
            </span>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-1 text-sm font-medium">
            <Link 
              to="/queue" 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold cursor-pointer"
            >
              <Inbox className="w-4 h-4 text-blue-600" />
              <span>Queue</span>
            </Link>

            <Link 
              to="/403" 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-400" />
              <span>Case</span>
            </Link>

            <Link 
              to="/status" 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
            >
              <Radio className="w-4 h-4 text-slate-400" />
              <span>Events</span>
            </Link>

            <Link 
              to="/404" 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-slate-400" />
              <span>Demo shop</span>
            </Link>

            <Link 
              to="/403" 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
              <span>Actions</span>
            </Link>

            <Link 
              to="/status" 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-slate-400" />
              <span>Benchmark</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Sidebar Status & User */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <Link
            to="/status"
            className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-full border border-emerald-300 bg-emerald-50/60 text-emerald-800 text-xs font-medium cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sandbox mode</span>
          </Link>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
              Operator
            </span>
            <Link 
              to="/signed-out" 
              className="text-blue-600 font-medium hover:text-blue-800 cursor-pointer"
            >
              Sign out
            </Link>
          </div>
        </div>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Exception queue
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Every detected case, newest first.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => alert('Sample fixture dataset loaded with 6 seeded dispute scenarios.')}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium shadow-xs cursor-pointer"
              >
                Sample data
              </button>
              <button 
                onClick={handleRunDetectors}
                disabled={runningDetectors}
                className="px-4 py-2 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white text-xs sm:text-sm font-medium shadow-xs cursor-pointer flex items-center space-x-2"
              >
                <Play className={`w-3.5 h-3.5 fill-current ${runningDetectors ? 'animate-spin' : ''}`} />
                <span>{runningDetectors ? 'Scanning...' : 'Run detectors'}</span>
              </button>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs font-medium text-slate-500">Open cases</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">12</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs font-medium text-slate-500">Awaiting approval</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">3</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs font-medium text-slate-500">Duplicates blocked today</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">7</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-xs font-medium text-slate-500">Oldest open case</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 flex items-baseline gap-1.5">
                <span>38</span> <span className="text-base sm:text-lg font-bold text-slate-600">min</span>
              </div>
            </div>

          </div>

          {/* Data Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Table Control Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Search input with NO inserted value */}
                <div className="relative min-w-[240px] sm:min-w-[280px]">
                  <input
                    type="text"
                    placeholder="Search case, order or capture id"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-none bg-white"
                  />
                </div>

                {/* Filter Pills */}
                <button 
                  onClick={() => setSelectedSeverity(prev => prev === 'All' ? 'High' : prev === 'High' ? 'Medium' : 'All')}
                  className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer font-medium ${selectedSeverity !== 'All' ? 'bg-blue-50 border-blue-400 text-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  Severity: {selectedSeverity}
                </button>

                <button 
                  onClick={() => setSelectedStatus(prev => prev === 'All' ? 'Open' : prev === 'Open' ? 'Proposed' : 'All')}
                  className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer font-medium ${selectedStatus !== 'All' ? 'bg-blue-50 border-blue-400 text-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  Status: {selectedStatus}
                </button>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold cursor-pointer flex items-center space-x-1.5 shadow-xs"
              >
                <span>Export CSV</span>
              </button>
            </div>

            {/* Cases Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="text-slate-500 font-semibold border-b border-slate-100 text-[11px] sm:text-xs">
                    <th className="py-3.5 px-6 font-medium">Case</th>
                    <th className="py-3.5 px-6 font-medium">Type</th>
                    <th className="py-3.5 px-6 font-medium">Order</th>
                    <th className="py-3.5 px-6 font-medium">Amount</th>
                    <th className="py-3.5 px-6 font-medium">Severity</th>
                    <th className="py-3.5 px-6 font-medium">Age</th>
                    <th className="py-3.5 px-6 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredCases.map((c) => (
                    <tr 
                      key={c.id} 
                      onClick={() => navigate('/403')}
                      className="cursor-pointer hover:bg-slate-50/70"
                    >
                      <td className="py-4 px-6 font-bold text-slate-900 font-mono">
                        {c.id}
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-800">
                        {c.type}
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-600">
                        {c.order}
                      </td>
                      <td className="py-4 px-6 font-mono font-medium text-slate-800">
                        {c.amount}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          c.severity === 'High' 
                            ? 'bg-rose-50 border-rose-300 text-rose-600' 
                            : c.severity === 'Medium'
                            ? 'bg-amber-50 border-amber-300 text-amber-700'
                            : 'bg-slate-50 border-slate-300 text-slate-600'
                        }`}>
                          {c.severity}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        {c.age}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                          c.status === 'Open'
                            ? 'border-amber-300 text-amber-700 bg-amber-50/60'
                            : c.status === 'Investigating'
                            ? 'border-blue-400 text-blue-600 bg-blue-50/60'
                            : c.status === 'Proposed'
                            ? 'border-emerald-400 text-emerald-700 bg-emerald-50/60'
                            : 'border-slate-300 text-slate-600 bg-slate-50'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-4 sm:px-6 border-t border-slate-100 text-xs text-slate-500">
              Showing {filteredCases.length} of 12
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
