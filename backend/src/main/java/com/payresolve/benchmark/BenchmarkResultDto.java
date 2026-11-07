package com.payresolve.benchmark;

import java.time.Instant;
import java.util.List;

/**
 * API DTO conveying benchmark evaluation metrics and individual case outcomes.
 */
public record BenchmarkResultDto(
    String id,
    Instant runAt,
    int totalCases,
    int passedCases,
    double precisionPct,
    double recallPct,
    double groundingRatePct,
    double medianTimeToCauseSeconds,
    List<Boolean> caseOutcomes,
    List<BenchmarkCaseDetail> cases
) {
    public record BenchmarkCaseDetail(
        int index,
        String caseId,
        String type,
        boolean passed,
        String expectedOutcome,
        String actualOutcome,
        long durationMs
    ) {}
}

