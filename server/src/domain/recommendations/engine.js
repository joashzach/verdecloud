const INSTANCE_TYPES = require("../../data/instanceTypes");

const {
  getIdleRecommendation
} = require("./idle");

const {
  getRightSizeRecommendation
} = require("./rightSize");

const {
  getSchedulingRecommendation
} = require("./scheduling");

const {
  getCarbonShiftRecommendation
} = require("./carbonShift");

const {
  calculateRightSizeSavings
} = require("../energy/savings");

const {
  calculateRiskScore
} = require("./riskScore");

function getRecommendations(metrics) {
  const recommendations = [];

  // Idle cleanup
  const idle = getIdleRecommendation({
    avgCpuPercent: metrics.avgCpuPercent,
    avgNetworkBytes: metrics.avgNetworkBytes,
    instanceAgeDays: metrics.instanceAgeDays
  });

  if (idle) {
    recommendations.push(idle);
  }

  // Right-sizing
  const rightSize = getRightSizeRecommendation({
    instanceType: metrics.instanceType,
    p95CpuPercent: metrics.p95CpuPercent
  });

  if (rightSize) {
    const currentInstance =
      INSTANCE_TYPES[metrics.instanceType];

    const proposedInstance =
      INSTANCE_TYPES[rightSize.proposed.instanceType];

    const projectedSavings = calculateRightSizeSavings({
      currentInstance,
      proposedInstance,
      currentCpuUtilization: metrics.p95CpuPercent,
      idleWattsPerVcpu: metrics.idleWattsPerVcpu,
      maxWattsPerVcpu: metrics.maxWattsPerVcpu,
      hoursRunning: metrics.hoursRunning,
      pue: metrics.pue,
      gridIntensity: metrics.currentGridIntensity
    });

    const risk = calculateRiskScore(
      metrics.p95CpuPercent
    );

    recommendations.push({
      ...rightSize,
      projectedSavings: projectedSavings.savings,
      risk
    });
  }

  // Scheduled stop
  const scheduling = getSchedulingRecommendation({
    environment: metrics.environment,
    avgCpuPercent: metrics.avgCpuPercent,
    avgNetworkBytes: metrics.avgNetworkBytes,
    outsideWorkingHours: metrics.outsideWorkingHours
  });

  if (scheduling) {
    recommendations.push(scheduling);
  }

  // Carbon-aware shifting
  const carbonShift = getCarbonShiftRecommendation({
    currentGridIntensity: metrics.currentGridIntensity,
    alternativeGridIntensity: metrics.alternativeGridIntensity,
    workloadFlexible: metrics.workloadFlexible
  });

  if (carbonShift) {
    recommendations.push(carbonShift);
  }

  return recommendations;
}

module.exports = {
  getRecommendations
};