const DEFAULT_MIN_REDUCTION_PERCENT = 10;

function shouldCarbonShift({
  currentGridIntensity,
  alternativeGridIntensity,
  workloadFlexible,
  minReductionPercent = DEFAULT_MIN_REDUCTION_PERCENT
}) {
  if (
    !Number.isFinite(currentGridIntensity) ||
    currentGridIntensity < 0
  ) {
    throw new Error(
      "currentGridIntensity must be a non-negative number"
    );
  }

  if (
    !Number.isFinite(alternativeGridIntensity) ||
    alternativeGridIntensity < 0
  ) {
    throw new Error(
      "alternativeGridIntensity must be a non-negative number"
    );
  }

  if (typeof workloadFlexible !== "boolean") {
    throw new Error("workloadFlexible must be a boolean");
  }

  if (
    !Number.isFinite(minReductionPercent) ||
    minReductionPercent < 0 ||
    minReductionPercent > 100
  ) {
    throw new Error(
      "minReductionPercent must be between 0 and 100"
    );
  }

  if (!workloadFlexible || currentGridIntensity === 0) {
    return false;
  }

  const reductionPercent =
    ((currentGridIntensity - alternativeGridIntensity) /
      currentGridIntensity) *
    100;

  return reductionPercent >= minReductionPercent;
}

function getCarbonShiftRecommendation(metrics) {
  if (!shouldCarbonShift(metrics)) {
    return null;
  }

  const reductionPercent =
    ((metrics.currentGridIntensity -
      metrics.alternativeGridIntensity) /
      metrics.currentGridIntensity) *
    100;

  return {
    type: "CARBON_SHIFT",
    action: "SHIFT_WORKLOAD",
    riskTier: 2,
    reason:
      `Alternative execution window has ${reductionPercent.toFixed(1)}% ` +
      "lower grid carbon intensity.",
    current: {
      gridIntensity: metrics.currentGridIntensity
    },
    proposed: {
      gridIntensity: metrics.alternativeGridIntensity
    },
    projectedCarbonReductionPercent: reductionPercent
  };
}

module.exports = {
  shouldCarbonShift,
  getCarbonShiftRecommendation
};