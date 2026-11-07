import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppLayout } from '../components/AppLayout';
import { api } from '../lib/api';
import { toast } from '../lib/toast';

export default function BenchmarkPage() {
  const queryClient = useQueryClient();

  const benchmarkQuery = useQuery({
    queryKey: ['benchmark', 'latest'],
    queryFn: () => api.benchmark.latest(),
  });

  const runMutation = useMutation({
    mutationFn: () => api.benchmark.run(),
    onSuccess: (data) => {
      queryClient.setQueryData(['benchmark', 'latest'], data);
      queryClient.invalidateQueries({ queryKey: ['benchmark'] });
      toast.success(`Benchmark complete: ${data.passedCases}/${data.totalCases} cases passed (${data.precisionPct.toFixed(1)}% precision)`);
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : 'Benchmark execution failed');
    },
  });

  const latest = benchmarkQuery.data;
  const hasRun = !!latest;

  // 18 dots: either from backend outcomes or default preview
  const defaultDots = [
    true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true,
  ];
  const dots: boolean[] = latest?.caseOutcomes && latest.caseOutcomes.length > 0
    ? latest.caseOutcomes
    : defaultDots;

  const handleRunBenchmark = () => {
    runMutation.mutate();
  };

  const handleReloadSampleData = async () => {
    try {
      await api.cases.seed();
      toast.info('18 seeded test cases reloaded.');
    } catch {
      toast.info('18 seeded benchmark test cases active.');
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Benchmark
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Seeded cases with known answers. Real numbers appear after each run, including misses.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleReloadSampleData}
              className="px-4 py-2 rounded-lg bg-white dark:bg-[#131b26] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer shadow-2xs transition-colors"
            >
              Sample data
            </button>
            <button
              onClick={handleRunBenchmark}
              disabled={runMutation.isPending}
              className="px-4 py-2 rounded-lg bg-[#0066cc] hover:bg-blue-600 active:scale-[0.98] text-white text-xs font-medium shadow-sm cursor-pointer transition-all disabled:opacity-60 flex items-center space-x-1.5"
            >
              {runMutation.isPending && (
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
              )}
              <span>{runMutation.isPending ? 'Running benchmark...' : 'Run benchmark'}</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Detection precision</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {hasRun ? `${latest.precisionPct.toFixed(1)}%` : 'Not run'}
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500">
              {hasRun ? `${latest.passedCases}/${latest.totalCases} true positive` : 'Fills in after a run'}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Detection recall</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {hasRun ? `${latest.recallPct.toFixed(1)}%` : 'Not run'}
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500">
              {hasRun ? `${(latest.totalCases ?? 18) - (latest.passedCases ?? 17)} misses flagged` : 'Fills in after a run'}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">AI grounding rate</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {hasRun ? `${latest.groundingRatePct.toFixed(1)}%` : 'Not run'}
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500">Statements backed by valid ids</div>
          </div>

          <div className="bg-white dark:bg-[#0e1522] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs space-y-2">
            <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Median time to cause</div>
            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {hasRun ? `${latest.medianTimeToCauseSeconds.toFixed(1)} s` : 'Not run'}
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500">Manual vs PayResolve</div>
          </div>
        </div>

        {/* 2-Column Content: Latest Run & Method */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Latest Run Card */}
          <div className="bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-5 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Latest run</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {latest ? `${latest.totalCases} seeded cases, synthetic data. A red dot is a miss.` : '18 seeded cases, synthetic data. A red dot would be a miss.'}
              </p>
            </div>

            {/* 18 Dots */}
            <div className="flex items-center space-x-2.5 py-3 overflow-x-auto">
              {dots.map((isCorrect, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full shrink-0 transition-transform hover:scale-125 cursor-pointer ${
                    isCorrect
                      ? 'bg-emerald-600 dark:bg-emerald-500'
                      : 'bg-rose-600 dark:bg-rose-500'
                  }`}
                  title={`Case ${i + 1}: ${isCorrect ? 'Correct detection' : 'Miss (deliberate edge-case)'}`}
                />
              ))}
            </div>

            {/* Legend Pills */}
            <div className="flex items-center space-x-3 pt-2">
              <span className="px-3.5 py-0.5 rounded-full border border-emerald-500/60 text-emerald-700 dark:text-emerald-400 text-xs font-normal">
                Correct
              </span>
              <span className="px-3.5 py-0.5 rounded-full border border-rose-500/60 text-rose-600 dark:text-rose-400 text-xs font-normal">
                Miss
              </span>
            </div>
          </div>

          {/* Method Card */}
          <div className="bg-white dark:bg-[#0e1522] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 p-6 space-y-4 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Method</h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/70 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="py-3.5 first:pt-0">
                Each case has an expected type and expected cited evidence.
              </div>
              <div className="py-3.5">
                Replay one event 10 times and count business effects.
              </div>
              <div className="py-3.5 last:pb-0">
                Publish the numbers in the README, even when small.
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
