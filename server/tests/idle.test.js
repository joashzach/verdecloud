const {
  isIdleInstance,
  getIdleRecommendation
} = require("../src/domain/recommendations/idle");

describe("Idle recommendation", () => {
  test("identifies an idle instance", () => {
    expect(
      isIdleInstance({
        avgCpuPercent: 2,
        avgNetworkBytes: 0,
        instanceAgeDays: 20
      })
    ).toBe(true);
  });

  test("does not flag a new instance", () => {
    expect(
      isIdleInstance({
        avgCpuPercent: 2,
        avgNetworkBytes: 0,
        instanceAgeDays: 1
      })
    ).toBe(false);
  });

  test("does not flag high CPU usage", () => {
    expect(
      isIdleInstance({
        avgCpuPercent: 20,
        avgNetworkBytes: 0,
        instanceAgeDays: 20
      })
    ).toBe(false);
  });

  test("does not flag active network traffic", () => {
    expect(
      isIdleInstance({
        avgCpuPercent: 2,
        avgNetworkBytes: 1000,
        instanceAgeDays: 20
      })
    ).toBe(false);
  });

  test("returns an idle cleanup recommendation", () => {
    const result = getIdleRecommendation({
      avgCpuPercent: 2,
      avgNetworkBytes: 0,
      instanceAgeDays: 20
    });

    expect(result).toEqual({
      type: "IDLE_CLEANUP",
      action: "STOP_INSTANCE",
      riskTier: 0,
      reason: expect.any(String)
    });
  });

  test("returns null when instance is not idle", () => {
    expect(
      getIdleRecommendation({
        avgCpuPercent: 20,
        avgNetworkBytes: 0,
        instanceAgeDays: 20
      })
    ).toBeNull();
  });
});