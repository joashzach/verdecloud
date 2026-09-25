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

function getRecommendations(metrics) {
  const recommendations = [];

  const idle = getIdleRecommendation({
    avgCpuPercent: metrics.avgCpuPercent,
    avgNetworkBytes: metrics.avgNetworkBytes,
    instanceAgeDays: metrics.instanceAgeDays
  });

  if (idle) {
    recommendations.push(idle);
  }

  const rightSize = getRightSizeRecommendation({
    instanceType: metrics.instanceType,
    p95CpuPercent: metrics.p95CpuPercent
  });

  if (rightSize) {
    recommendations.push(rightSize);
  }

  const scheduling = getSchedulingRecommendation({
    environment: metrics.environment,
    avgCpuPercent: metrics.avgCpuPercent,
    avgNetworkBytes: metrics.avgNetworkBytes,
    outsideWorkingHours: metrics.outsideWorkingHours
  });

  if (scheduling) {
    recommendations.push(scheduling);
  }

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