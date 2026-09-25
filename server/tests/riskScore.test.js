const {
  calculateRiskScore
} = require("../src/domain/recommendations/riskScore");

describe("Risk score", () => {
  test("returns low risk for low CPU utilization", () => {
    const result = calculateRiskScore(20);

    expect(result.tier).toBe("LOW");
    expect(result.score).toBeCloseTo(30.77);
  });

  test("returns medium risk", () => {
    const result = calculateRiskScore(40);

    expect(result.tier).toBe("MEDIUM");
  });

  test("returns high risk", () => {
    const result = calculateRiskScore(60);

    expect(result.tier).toBe("HIGH");
  });

  test("caps the score at 100", () => {
    const result = calculateRiskScore(90);

    expect(result.score).toBe(100);
    expect(result.tier).toBe("HIGH");
  });

  test("supports a custom threshold", () => {
    const result = calculateRiskScore(70, 75);

    expect(result.score).toBeCloseTo(93.33);
    expect(result.tier).toBe("HIGH");
  });

  test("rejects invalid CPU utilization", () => {
    expect(() => calculateRiskScore(120)).toThrow();
  });

  test("rejects invalid threshold", () => {
    expect(() => calculateRiskScore(40, 0)).toThrow();
  });
});