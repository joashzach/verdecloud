const {
  calculateRightSizeSavings
} = require("../src/domain/energy/savings");

describe("Right-size savings", () => {
  const currentInstance = {
    vcpu: 8,
    memoryGB: 32
  };

  const proposedInstance = {
    vcpu: 4,
    memoryGB: 16
  };

  const config = {
    currentInstance,
    proposedInstance,
    currentCpuUtilization: 12,
    idleWattsPerVcpu: 10,
    maxWattsPerVcpu: 30,
    hoursRunning: 24,
    pue: 1.15,
    gridIntensity: 0.71
  };

  test("calculates projected savings", () => {
    const result = calculateRightSizeSavings(config);

    expect(result.savings.energyKwh).toBeGreaterThan(0);
    expect(result.savings.carbonKg).toBeGreaterThan(0);
  });

  test("increases CPU utilization on the smaller instance", () => {
    const result = calculateRightSizeSavings(config);

    expect(result.proposed.cpuUtilization).toBe(24);
  });

  test("returns current and proposed footprint", () => {
    const result = calculateRightSizeSavings(config);

    expect(result.current.energyKwh).toBeGreaterThan(0);
    expect(result.current.carbonKg).toBeGreaterThan(0);

    expect(result.proposed.energyKwh).toBeGreaterThan(0);
    expect(result.proposed.carbonKg).toBeGreaterThan(0);
  });

  test("rejects a proposed instance that cannot handle the workload", () => {
    expect(() =>
      calculateRightSizeSavings({
        ...config,
        currentCpuUtilization: 80,
        proposedInstance: {
          vcpu: 1,
          memoryGB: 1
        }
      })
    ).toThrow();
  });

  test("rejects invalid CPU utilization", () => {
    expect(() =>
      calculateRightSizeSavings({
        ...config,
        currentCpuUtilization: 120
      })
    ).toThrow();
  });
});