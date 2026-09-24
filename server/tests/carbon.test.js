const { calculateCarbonKg } = require("../src/domain/energy/carbon");

describe("Carbon model", () => {
  test("calculates carbon emissions correctly", () => {
    // 100 kWh × 0.71 kg CO₂/kWh = 71 kg CO₂
    expect(calculateCarbonKg(100, 0.71)).toBeCloseTo(71);
  });

  test("returns zero when energy is zero", () => {
    expect(calculateCarbonKg(0, 0.71)).toBe(0);
  });

  test("returns zero when grid intensity is zero", () => {
    expect(calculateCarbonKg(100, 0)).toBe(0);
  });

  test("rejects negative energy", () => {
    expect(() =>
      calculateCarbonKg(-100, 0.71)
    ).toThrow();
  });

  test("rejects negative grid intensity", () => {
    expect(() =>
      calculateCarbonKg(100, -0.71)
    ).toThrow();
  });
});