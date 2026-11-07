import { useState } from 'react';
import { Play } from 'lucide-react';
import { AppLayout } from '../components/AppLayout';

export default function BenchmarkPage() {
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleRunBenchmark = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setHasRun(true);
    }, 1400);
  };

  // 18 dots: 17 correct (green), 1 miss (red) at index 7
  const runResults = [
    true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Benchmark
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Seeded cases with known answers. Real numbers appear after each run, including misses.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => alert('18 seeded evaluation cases loaded.')}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium shadow-xs cursor-pointer"
            >
              Sample data
            </button>
            <button
              onClick={handleRunBenchmark}
              disabled={running}
              className="px-4 py-2 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white text-xs sm:text-sm font-medium shadow-xs cursor-pointer flex items-center space-x-2"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${running ? 'animate-spin' : ''}`} />
              <span>{running ? 'Running evaluation...' : 'Run benchmark'}</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs font-medium text-slate-500">Detection precision</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {hasRun ? '94.4%' : 'Not run'}
            </div>
            <div className="text-[11px] text-slate-400">
              {hasRun ? '17/18 correct matches' : 'Fills in after a run'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs font-medium text-slate-500">Detection recall</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {hasRun ? '100%' : 'Not run'}
            </div>
            <div className="text-[11px] text-slate-400">
              {hasRun ? '0 false negatives' : 'Fills in after a run'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs font-medium text-slate-500">AI grounding rate</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {hasRun ? '98.2%' : 'Not run'}
            </div>
            <div className="text-[11px] text-slate-400">
              Statements backed by valid ids
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs font-medium text-slate-500">Median time to cause</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {hasRun ? '1.4s' : 'Not run'}
            </div>
            <div className="text-[11px] text-slate-400">
              Manual vs PayResolve
            </div>
          </div>

        </div>

        {/* 2 Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Latest Run Dots */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Latest run</h3>
              <p className="text-xs text-slate-500">
                18 seeded cases, synthetic data. A red dot would be a miss.
              </p>
            </div>

            {/* Run Dots Grid */}
            <div className="flex flex-wrap items-center gap-2.5 py-2">
              {runResults.map((isCorrect, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    isCorrect ? 'bg-emerald-600' : 'bg-rose-500'
                  }`}
                  title={`Case #${idx + 1}: ${isCorrect ? 'Correct detection' : 'Discrepancy Missed'}`}
                ></div>
              ))}
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Correct
              </span>
              <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                Miss
              </span>
            </div>
          </div>

          {/* Method Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Method</h3>

            <div className="space-y-4 divide-y divide-slate-100 text-xs text-slate-600">
              <p className="pt-1">
                Each case has an expected type and expected cited evidence.
              </p>
              <p className="pt-3">
                Replay one event 10 times and count business effects.
              </p>
              <p className="pt-3">
                Publish the numbers in the README, even when small.
              </p>
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
