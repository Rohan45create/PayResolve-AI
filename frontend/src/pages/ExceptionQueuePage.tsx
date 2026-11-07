import { useState } from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  { id: 'PR-0142', type: 'Paid, not marked',  order: '#10482', amount: '$84.50',          severity: 'High',   age: '4 min', status: 'Open' },
  { id: 'PR-0141', type: 'Amount mismatch',   order: '#10479', amount: '$84.50 vs $79.50', severity: 'High',   age: '12 min', status: 'Investigating' },
  { id: 'PR-0140', type: 'Duplicate event',   order: '#10477', amount: '$32.00',           severity: 'Medium', age: '21 min', status: 'Proposed' },
  { id: 'PR-0138', type: 'Refund mismatch',   order: '#10470', amount: '$18.00',           severity: 'Medium', age: '38 min', status: 'Open' },
  { id: 'PR-0137', type: 'Orphan capture',    order: '#n/a',   amount: '$120.00',          severity: 'Medium', age: '1 h',    status: 'Open' },
  { id: 'PR-0135', type: 'Paid, not marked',  order: '#10466', amount: '$56.20',           severity: 'Low',    age: '2 h',    status: 'Resolved' },
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
    const matchesStatus   = selectedStatus   === 'All' || c.status   === selectedStatus;
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
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Exception queue</h1>
            <p className="text-sm text-slate-500 mt-0.5">Every detected case, newest first.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Sample fixture dataset loaded with 6 seeded dispute scenarios.')}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 cursor-pointer"
            >
              Sample data
            </button>
            <button
              onClick={handleRunDetectors}
              disabled={runningDetectors}
              className="px-4 py-2 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white text-xs font-semibold shadow-sm cursor-pointer flex items-center space-x-2"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${runningDetectors ? 'animate-spin' : ''}`} />
              <span>{runningDetectors ? 'Scanning...' : 'Run detectors'}</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Open cases',           value: '12' },
            { label: 'Awaiting approval',    value: '3' },
            { label: 'Duplicates blocked today', value: '7' },
            { label: 'Oldest open case',     value: '38 min' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
              <div className="text-xs font-medium text-slate-500">{label}</div>
              <div className="text-3xl font-extrabold text-slate-900">{value}</div>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Controls */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Search case, order or capture id"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3.5 py-2 text-xs rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white min-w-[220px]"
              />
              <button
                onClick={() =>
                  setSelectedSeverity((p) => (p === 'All' ? 'High' : p === 'High' ? 'Medium' : 'All'))
                }
                className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer font-medium ${
                  selectedSeverity !== 'All'
                    ? 'bg-blue-50 border-blue-400 text-blue-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Severity: {selectedSeverity}
              </button>
              <button
                onClick={() =>
                  setSelectedStatus((p) => (p === 'All' ? 'Open' : p === 'Open' ? 'Proposed' : 'All'))
                }
                className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer font-medium ${
                  selectedStatus !== 'All'
                    ? 'bg-blue-50 border-blue-400 text-blue-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Status: {selectedStatus}
              </button>
            </div>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold cursor-pointer hover:bg-slate-50"
            >
              Export CSV
            </button>
          </div>

          {/* Table */}
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
                    onClick={() => navigate(`/case/${c.id}`)}
                    className="cursor-pointer hover:bg-slate-50/70"
                  >
                    <td className="py-4 px-6 font-bold text-slate-900 font-mono">{c.id}</td>
                    <td className="py-4 px-6 font-medium text-slate-800">{c.type}</td>
                    <td className="py-4 px-6 font-mono text-slate-600">{c.order}</td>
                    <td className="py-4 px-6 font-mono font-medium text-slate-800">{c.amount}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          c.severity === 'High'
                            ? 'bg-rose-50 border-rose-300 text-rose-600'
                            : c.severity === 'Medium'
                            ? 'bg-amber-50 border-amber-300 text-amber-700'
                            : 'bg-slate-50 border-slate-300 text-slate-600'
                        }`}
                      >
                        {c.severity}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{c.age}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                          c.status === 'Open'
                            ? 'border-amber-300 text-amber-700 bg-amber-50/60'
                            : c.status === 'Investigating'
                            ? 'border-blue-400 text-blue-600 bg-blue-50/60'
                            : c.status === 'Proposed'
                            ? 'border-emerald-400 text-emerald-700 bg-emerald-50/60'
                            : 'border-slate-300 text-slate-600 bg-slate-50'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 sm:px-6 border-t border-slate-100 text-xs text-slate-500">
            Showing {filteredCases.length} of 12
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
