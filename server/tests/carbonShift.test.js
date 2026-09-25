const {
  shouldCarbonShift,
  getCarbonShiftRecommendation
} = require("../src/domain/recommendations/carbonShift");

describe("Carbon-aware shifting", () => {
  const metrics = {
    currentGridIntensity: 0.71,
    alternativeGridIntensity: 0.50,
    workloadFlexible: true
  };

  test("recommends shifting when alternative is significantly cleaner", () => {
    expect(shouldCarbonShift(metrics)).toBe(true);
  });

  test("does not recommend when workload is not flexible", () => {
    expect(
      shouldCarbonShift({
        ...metrics,
        workloadFlexible: false
      })
    ).toBe(false);
  });

  test("does not recommend when carbon reduction is too small", () => {
    expect(
      shouldCarbonShift({
        ...metrics,
        alternativeGridIntensity: 0.68
      })
    ).toBe(false);
  });

  test("returns a carbon shift recommendation", () => {
    const result = getCarbonShiftRecommendation(metrics);

    expect(result.type).toBe("CARBON_SHIFT");
    expect(result.action).toBe("SHIFT_WORKLOAD");
    expect(result.riskTier).toBe(2);
    expect(result.projectedCarbonReductionPercent).toBeCloseTo(29.58);
  });

  test("returns null when shifting is not appropriate", () => {
    expect(
      getCarbonShiftRecommendation({
        ...metrics,
        workloadFlexible: false
      })
    ).toBeNull();
  });

  test("rejects invalid current intensity", () => {
    expect(() =>
      shouldCarbonShift({
        ...metrics,
        currentGridIntensity: -1
      })
    ).toThrow();
  });

  test("rejects invalid alternative intensity", () => {
    expect(() =>
      shouldCarbonShift({
        ...metrics,
        alternativeGridIntensity: -1
      })
    ).toThrow();
  });

  test("rejects invalid workload flexibility", () => {
    expect(() =>
      shouldCarbonShift({
        ...metrics,
        workloadFlexible: "yes"
      })
    ).toThrow();
  });
});