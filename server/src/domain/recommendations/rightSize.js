const INSTANCE_TYPES = require("../../data/instanceTypes");

const DEFAULT_P95_THRESHOLD = 65;

function shouldRightSize(
  p95CpuPercent,
  threshold = DEFAULT_P95_THRESHOLD
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

  return p95CpuPercent < threshold;
}

function findSmallerInstanceType(currentType) {
  const current = INSTANCE_TYPES[currentType];

  if (!current) {
    throw new Error(`Unknown instance type: ${currentType}`);
  }

  const candidates = Object.entries(INSTANCE_TYPES)
    .filter(([type, specs]) => {
      return (
        specs.vcpu <= current.vcpu &&
        specs.memoryGB < current.memoryGB
      );
    })
    .sort((a, b) => {
      const capacityA = a[1].vcpu * a[1].memoryGB;
      const capacityB = b[1].vcpu * b[1].memoryGB;

      return capacityB - capacityA;
    });

  return candidates.length > 0 ? candidates[0][0] : null;
}

function getRightSizeRecommendation({
  instanceType,
  p95CpuPercent,
  threshold = DEFAULT_P95_THRESHOLD
}) {
  if (!instanceType) {
    throw new Error("instanceType is required");
  }

  const recommended = shouldRightSize(
    p95CpuPercent,
    threshold
  );

  if (!recommended) {
    return null;
  }

  const proposedInstanceType =
    findSmallerInstanceType(instanceType);

  if (!proposedInstanceType) {
    return null;
  }

  return {
    type: "RIGHT_SIZE",
    action: "DOWNSIZE_INSTANCE",

    current: {
      instanceType,
      p95CpuPercent
    },

    proposed: {
      instanceType: proposedInstanceType
    },

    reason:
      `p95 CPU utilization is ${p95CpuPercent}%, ` +
      `below the ${threshold}% threshold.`
  };
}

module.exports = {
  shouldRightSize,
  findSmallerInstanceType,
  getRightSizeRecommendation
};