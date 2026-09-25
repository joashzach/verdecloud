function calculateRiskScore(
  p95CpuPercent,
  threshold = 65
) {
  if (
    !Number.isFinite(p95CpuPercent) ||
    p95CpuPercent < 0 ||
    p95CpuPercent > 100
  ) {
    throw new Error("p95CpuPercent must be between 0 and 100");
  }

  if (
    !Number.isFinite(threshold) ||
    threshold <= 0 ||
    threshold > 100
  ) {
    throw new Error("threshold must be between 0 and 100");
  }

  const score = Math.min(
    100,
    (p95CpuPercent / threshold) * 100
  );

  let tier;

  if (score < 50) {
    tier = "LOW";
  } else if (score < 80) {
    tier = "MEDIUM";
  } else {
    tier = "HIGH";
  }

  return {
    score,
    tier
  };
}

module.exports = {
  calculateRiskScore
};