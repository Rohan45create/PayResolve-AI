import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

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

  const filteredCases = initialCases.filter((c) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      c.id.toLowerCase().includes(q) ||
      c.order.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q);
    const matchesSeverity = selectedSeverity === 'All' || c.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleRunDetectors = () => {
    setRunningDetectors(true);
    setTimeout(() => {
      setRunningDetectors(false);
      alert('Detectors executed: 6 discrepancies re-evaluated across PayPal Orders v2 & webhook log.');
    }, 800);
  };

  const handleExportCSV = () => {
    const rows = ['Case,Type,Order,Amount,Severity,Age,Status'].concat(
      filteredCases.map(
        (c) => `${c.id},"${c.type}",${c.order},"${c.amount}",${c.severity},${c.age},${c.status}`,
      ),
    );
    const uri = encodeURI('data:text/csv;charset=utf-8,' + rows.join('\n'));
    const a = document.createElement('a');
    a.setAttribute('href', uri);
    a.setAttribute('download', 'payresolve_exception_queue.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Exception queue
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Every detected case, newest first.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Sample fixture dataset loaded with 6 seeded dispute scenarios.')}
              className="px-4 py-2 rounded-lg bg-white dark:bg-[#131b26] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer shadow-2xs"
            >
              Sample data
            </button>
            <button
              onClick={handleRunDetectors}
              disabled={runningDetectors}
              className="px-4 py-2 rounded-lg bg-[#0066cc] hover:bg-blue-600 active:scale-[0.98] text-white text-xs font-medium shadow-sm cursor-pointer transition-all"
            >
              {runningDetectors ? 'Scanning...' : 'Run detectors'}
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Open cases</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">12</div>
          </div>
          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Awaiting approval</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">3</div>
          </div>
          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Duplicates blocked today</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">7</div>
          </div>
          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Oldest open case</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">38 min</div>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs p-6 space-y-5">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <input
                type="text"
                placeholder="Search case, order or capture id"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 bg-white dark:bg-[#131b26] focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button
                onClick={() => setSelectedSeverity(selectedSeverity === 'All' ? 'High' : 'All')}
                className={`px-3 py-1.5 rounded-full border text-xs font-normal cursor-pointer transition-colors ${
                  selectedSeverity !== 'All'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Type
              </button>
              <button
                onClick={() => setSelectedSeverity(selectedSeverity === 'High' ? 'All' : 'High')}
                className={`px-3 py-1.5 rounded-full border text-xs font-normal cursor-pointer transition-colors ${
                  selectedSeverity === 'High'
                    ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Severity
              </button>
              <button
                onClick={() => setSelectedStatus(selectedStatus === 'Open' ? 'All' : 'Open')}
                className={`px-3 py-1.5 rounded-full border text-xs font-normal cursor-pointer transition-colors ${
                  selectedStatus === 'Open'
                    ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Status
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer shadow-2xs self-start sm:self-auto"
            >
              Export CSV
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 font-normal">
                  <th className="py-3 pr-4 font-normal">Case</th>
                  <th className="py-3 px-4 font-normal">Type</th>
                  <th className="py-3 px-4 font-normal">Order</th>
                  <th className="py-3 px-4 font-normal">Amount</th>
                  <th className="py-3 px-4 font-normal">Severity</th>
                  <th className="py-3 px-4 font-normal">Age</th>
                  <th className="py-3 pl-4 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredCases.map((c) => {
                  const severityBadge =
                    c.severity === 'High' ? (
                      <span className="px-3 py-0.5 rounded-full border border-rose-400 dark:border-rose-700 text-rose-600 dark:text-rose-400 text-xs">
                        High
                      </span>
                    ) : c.severity === 'Medium' ? (
                      <span className="px-3 py-0.5 rounded-full border border-amber-400 dark:border-amber-700 text-amber-600 dark:text-amber-400 text-xs">
                        Medium
                      </span>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400 text-xs">Low</span>
                    );

                  const statusBadge =
                    c.status === 'Open' ? (
                      <span className="px-3 py-0.5 rounded-full border border-amber-400 dark:border-amber-700 text-amber-600 dark:text-amber-400 text-xs">
                        Open
                      </span>
                    ) : c.status === 'Investigating' ? (
                      <span className="px-3 py-0.5 rounded-full border border-blue-400 dark:border-blue-600 text-blue-600 dark:text-blue-400 text-xs">
                        Investigating
                      </span>
                    ) : c.status === 'Proposed' ? (
                      <span className="px-3 py-0.5 rounded-full border border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 text-xs">
                        Proposed
                      </span>
                    ) : (
                      <span className="px-3 py-0.5 rounded-full border border-emerald-400 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 text-xs">
                        Resolved
                      </span>
                    );

                  return (
                    <tr
                      key={c.id}
                      onClick={() => navigate(`/case/${c.id}`)}
                      className="hover:bg-slate-50/80 dark:hover:bg-[#121b2b] cursor-pointer transition-colors"
                    >
                      <td className="py-4 pr-4 font-semibold text-slate-900 dark:text-white">
                        <Link to={`/case/${c.id}`} className="hover:underline">
                          {c.id}
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-slate-700 dark:text-slate-300">{c.type}</td>
                      <td className="py-4 px-4 font-mono text-slate-600 dark:text-slate-400">{c.order}</td>
                      <td className="py-4 px-4 text-slate-700 dark:text-slate-300">{c.amount}</td>
                      <td className="py-4 px-4">{severityBadge}</td>
                      <td className="py-4 px-4 text-slate-500 dark:text-slate-400">{c.age}</td>
                      <td className="py-4 pl-4">{statusBadge}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredCases.length} of 12
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
