const DEFAULT_CPU_THRESHOLD = 5;
const DEFAULT_NETWORK_THRESHOLD = 0;
const MIN_INSTANCE_AGE_DAYS = 14;

function isIdleInstance({
  avgCpuPercent,
  avgNetworkBytes,
  instanceAgeDays,
  cpuThreshold = DEFAULT_CPU_THRESHOLD,
  networkThreshold = DEFAULT_NETWORK_THRESHOLD
}) {
  if (!Number.isFinite(avgCpuPercent) || avgCpuPercent < 0 || avgCpuPercent > 100) {
    throw new Error("avgCpuPercent must be between 0 and 100");
  }

  if (!Number.isFinite(avgNetworkBytes) || avgNetworkBytes < 0) {
    throw new Error("avgNetworkBytes must be a non-negative number");
  }

  if (!Number.isFinite(instanceAgeDays) || instanceAgeDays < 0) {
    throw new Error("instanceAgeDays must be a non-negative number");
  }

  return (
    avgCpuPercent < cpuThreshold &&
    avgNetworkBytes <= networkThreshold &&
    instanceAgeDays >= MIN_INSTANCE_AGE_DAYS
  );
}

function getIdleRecommendation(metrics) {
  const idle = isIdleInstance(metrics);

  if (!idle) {
    return null;
  }

  return {
    type: "IDLE_CLEANUP",
    action: "STOP_INSTANCE",
    riskTier: 0,
    reason: "Instance has sustained low CPU and near-zero network activity for at least 14 days."
  };
}

module.exports = {
  isIdleInstance,
  getIdleRecommendation
};