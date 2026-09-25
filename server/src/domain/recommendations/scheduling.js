const DEFAULT_NETWORK_THRESHOLD = 0;
const DEFAULT_CPU_THRESHOLD = 5;

function isNonProductionEnvironment(environment) {
  return (
    typeof environment === "string" &&
    ["dev", "test", "development", "testing"].includes(
      environment.toLowerCase()
    )
  );
}

function shouldScheduleStop({
  environment,
  avgCpuPercent,
  avgNetworkBytes,
  outsideWorkingHours,
  cpuThreshold = DEFAULT_CPU_THRESHOLD,
  networkThreshold = DEFAULT_NETWORK_THRESHOLD
}) {
  if (!isNonProductionEnvironment(environment)) {
    return false;
  }

  if (
    !Number.isFinite(avgCpuPercent) ||
    avgCpuPercent < 0 ||
    avgCpuPercent > 100
  ) {
    throw new Error("avgCpuPercent must be between 0 and 100");
  }

  if (!Number.isFinite(avgNetworkBytes) || avgNetworkBytes < 0) {
    throw new Error("avgNetworkBytes must be a non-negative number");
  }

  if (typeof outsideWorkingHours !== "boolean") {
    throw new Error("outsideWorkingHours must be a boolean");
  }

  return (
    outsideWorkingHours &&
    avgCpuPercent < cpuThreshold &&
    avgNetworkBytes <= networkThreshold
  );
}

function getSchedulingRecommendation(metrics) {
  if (!shouldScheduleStop(metrics)) {
    return null;
  }

  return {
    type: "SCHEDULE_STOP",
    action: "AUTO_STOP_OUTSIDE_WORKING_HOURS",
    riskTier: 1,
    reason:
      "Development or test instance has near-zero activity outside working hours."
  };
}

module.exports = {
  isNonProductionEnvironment,
  shouldScheduleStop,
  getSchedulingRecommendation
};