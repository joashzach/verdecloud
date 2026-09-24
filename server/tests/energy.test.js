const { calculateEnergyKwh } = require("../src/domain/energy/energy");

describe("Energy model", () => {
  test("calculates energy correctly", () => {
    // 1000 W × 10 hours × 1.15 PUE = 11.5 kWh
    expect(calculateEnergyKwh(1000, 10, 1.15)).toBeCloseTo(11.5);
  });

  test("returns zero when power is zero", () => {
    expect(calculateEnergyKwh(0, 10, 1.15)).toBe(0);
  });

  test("returns zero when runtime is zero", () => {
    expect(calculateEnergyKwh(1000, 0, 1.15)).toBe(0);
  });

  test("applies PUE correctly", () => {
    // 500 W × 20 hours × 1.2 = 12 kWh
    expect(calculateEnergyKwh(500, 20, 1.2)).toBeCloseTo(12);
  });

  test("rejects negative power", () => {
    expect(() =>
      calculateEnergyKwh(-100, 10, 1.15)
    ).toThrow();
  });

  test("rejects negative runtime", () => {
    expect(() =>
      calculateEnergyKwh(1000, -5, 1.15)
    ).toThrow();
  });

  test("rejects PUE below 1", () => {
    expect(() =>
      calculateEnergyKwh(1000, 10, 0.9)
    ).toThrow();
  });
});