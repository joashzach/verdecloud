const INSTANCE_TYPES = require("../../data/instanceTypes");

const {
  getRightSizeRecommendation
} = require("./rightSize");

const {
  calculateRiskScore
} = require("./riskScore");

const {
  calculateRightSizeSavings
} = require("../energy/savings");

function getRecommendation({
  instanceType,
  p95CpuPercent,
  threshold = 65,
  idleWattsPerVcpu,
  maxWattsPerVcpu,
  hoursRunning,
  pue,
  gridIntensity
}) {
  const currentInstance = INSTANCE_TYPES[instanceType];

  if (!currentInstance) {
    throw new Error(`Unknown instance type: ${instanceType}`);
  }

  const rightSize = getRightSizeRecommendation({
    instanceType,
    p95CpuPercent,
    threshold
  });

  if (!rightSize) {
    return null;
  }

  const proposedInstance =
    INSTANCE_TYPES[rightSize.proposed.instanceType];

  const projectedSavings = calculateRightSizeSavings({
    currentInstance,
    proposedInstance,
    currentCpuUtilization: p95CpuPercent,
    idleWattsPerVcpu,
    maxWattsPerVcpu,
    hoursRunning,
    pue,
    gridIntensity
  });

  const risk = calculateRiskScore(
    p95CpuPercent,
    threshold
  );

  return {
    type: rightSize.type,
    action: rightSize.action,

    reason: rightSize.reason,

    current: {
      instanceType,
      vcpu: currentInstance.vcpu,
      memoryGB: currentInstance.memoryGB,
      p95CpuPercent
    },

    proposed: {
      instanceType: rightSize.proposed.instanceType,
      vcpu: proposedInstance.vcpu,
      memoryGB: proposedInstance.memoryGB
    },

    projectedSavings: projectedSavings.savings,

    risk
  };
}

module.exports = {
  getRecommendation
};