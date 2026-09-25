const {
  getRecommendations
} = require("../src/domain/recommendations/engine");

describe("Recommendation engine orchestrator", () => {
  const metrics = {
    instanceType: "t3.2xlarge",

    avgCpuPercent: 2,
    p95CpuPercent: 40,
    avgNetworkBytes: 0,
    instanceAgeDays: 20,

    environment: "dev",
    outsideWorkingHours: true,

    currentGridIntensity: 0.71,
    alternativeGridIntensity: 0.50,
    workloadFlexible: true,

    idleWattsPerVcpu: 10,
    maxWattsPerVcpu: 30,
    hoursRunning: 24,
    pue: 1.15
  };

  test("returns all applicable recommendations", () => {
    const recommendations = getRecommendations(metrics);

    expect(recommendations).toHaveLength(4);

    expect(
      recommendations.map((recommendation) => recommendation.type)
    ).toEqual([
      "IDLE_CLEANUP",
      "RIGHT_SIZE",
      "SCHEDULE_STOP",
      "CARBON_SHIFT"
    ]);
  });

  test("returns only applicable recommendations", () => {
    const recommendations = getRecommendations({
      ...metrics,
      avgCpuPercent: 20,
      p95CpuPercent: 80,
      avgNetworkBytes: 1000,
      instanceAgeDays: 2,
      environment: "production",
      outsideWorkingHours: false,
      workloadFlexible: false,
      alternativeGridIntensity: 0.70
    });

    expect(recommendations).toHaveLength(0);
  });

  test("can return a single recommendation", () => {
    const recommendations = getRecommendations({
      ...metrics,
      avgCpuPercent: 20,
      avgNetworkBytes: 1000,
      instanceAgeDays: 2,
      environment: "production",
      outsideWorkingHours: false,
      workloadFlexible: false
    });

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].type).toBe("RIGHT_SIZE");
  });
});