const {
  isNonProductionEnvironment,
  shouldScheduleStop,
  getSchedulingRecommendation
} = require("../src/domain/recommendations/scheduling");

describe("Scheduling recommendation", () => {
  const metrics = {
    environment: "dev",
    avgCpuPercent: 2,
    avgNetworkBytes: 0,
    outsideWorkingHours: true
  };

  test("identifies development environments", () => {
    expect(isNonProductionEnvironment("dev")).toBe(true);
    expect(isNonProductionEnvironment("test")).toBe(true);
    expect(isNonProductionEnvironment("production")).toBe(false);
  });

  test("recommends scheduled stop outside working hours", () => {
    expect(shouldScheduleStop(metrics)).toBe(true);
  });

  test("does not recommend during working hours", () => {
    expect(
      shouldScheduleStop({
        ...metrics,
        outsideWorkingHours: false
      })
    ).toBe(false);
  });

  test("does not recommend for production", () => {
    expect(
      shouldScheduleStop({
        ...metrics,
        environment: "production"
      })
    ).toBe(false);
  });

  test("does not recommend when CPU is active", () => {
    expect(
      shouldScheduleStop({
        ...metrics,
        avgCpuPercent: 20
      })
    ).toBe(false);
  });

  test("does not recommend when network is active", () => {
    expect(
      shouldScheduleStop({
        ...metrics,
        avgNetworkBytes: 1000
      })
    ).toBe(false);
  });

  test("returns a scheduling recommendation", () => {
    const result = getSchedulingRecommendation(metrics);

    expect(result).toEqual({
      type: "SCHEDULE_STOP",
      action: "AUTO_STOP_OUTSIDE_WORKING_HOURS",
      riskTier: 1,
      reason: expect.any(String)
    });
  });

  test("returns null when scheduling is not appropriate", () => {
    expect(
      getSchedulingRecommendation({
        ...metrics,
        outsideWorkingHours: false
      })
    ).toBeNull();
  });

  test("rejects invalid CPU utilization", () => {
    expect(() =>
      shouldScheduleStop({
        ...metrics,
        avgCpuPercent: 120
      })
    ).toThrow();
  });

  test("rejects invalid network activity", () => {
    expect(() =>
      shouldScheduleStop({
        ...metrics,
        avgNetworkBytes: -1
      })
    ).toThrow();
  });
});