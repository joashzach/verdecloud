const {
  calculateCpuPower,
  calculateMemoryPower,
  calculateTotalPower
} = require("../src/domain/energy/power");

describe("Power model", () => {
  const coefficients = {
    idleWattsPerVcpu: 10,
    maxWattsPerVcpu: 30
  };

  test("calculates CPU power at 0% utilization", () => {
    expect(
      calculateCpuPower({
        vcpu: 4,
        cpuUtilization: 0,
        ...coefficients
      })
    ).toBe(40);
  });

  test("calculates CPU power at 100% utilization", () => {
    expect(
      calculateCpuPower({
        vcpu: 4,
        cpuUtilization: 100,
        ...coefficients
      })
    ).toBe(120);
  });

  test("calculates memory power", () => {
    expect(calculateMemoryPower(16)).toBeCloseTo(6.272);
  });

  test("calculates total power", () => {
    const result = calculateTotalPower({
      vcpu: 4,
      cpuUtilization: 50,
      memoryGB: 16,
      ...coefficients
    });

    expect(result.cpuWatts).toBe(80);
    expect(result.memoryWatts).toBeCloseTo(6.272);
    expect(result.totalWatts).toBeCloseTo(86.272);
  });

  test("rejects invalid CPU utilization", () => {
    expect(() =>
      calculateCpuPower({
        vcpu: 4,
        cpuUtilization: 120,
        ...coefficients
      })
    ).toThrow();
  });
});