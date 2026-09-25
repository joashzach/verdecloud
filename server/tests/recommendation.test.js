const {
  getRecommendation
} = require("../src/domain/recommendations/recommendation");

describe("Recommendation engine", () => {
  const config = {
    instanceType: "t3.2xlarge",
    p95CpuPercent: 40,
    threshold: 65,
    idleWattsPerVcpu: 10,
    maxWattsPerVcpu: 30,
    hoursRunning: 24,
    pue: 1.15,
    gridIntensity: 0.71
  };

  test("creates a complete right-sizing recommendation", () => {
    const result = getRecommendation(config);

    expect(result).not.toBeNull();

    expect(result.type).toBe("RIGHT_SIZE");
    expect(result.action).toBe("DOWNSIZE_INSTANCE");

    expect(result.reason).toEqual(expect.any(String));

    expect(result.current.instanceType).toBe("t3.2xlarge");
    expect(result.proposed.instanceType).toBe("t3.xlarge");

    expect(result.projectedSavings.energyKwh).toBeGreaterThan(0);
    expect(result.projectedSavings.carbonKg).toBeGreaterThan(0);

    expect(result.risk).toHaveProperty("score");
    expect(result.risk).toHaveProperty("tier");
  });

  test("returns null when right-sizing is not recommended", () => {
    const result = getRecommendation({
      ...config,
      p95CpuPercent: 80
    });

    expect(result).toBeNull();
  });

  test("rejects an unknown instance type", () => {
    expect(() =>
      getRecommendation({
        ...config,
        instanceType: "invalid.type"
      })
    ).toThrow();
  });
});