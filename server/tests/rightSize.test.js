const {
  shouldRightSize,
  findSmallerInstanceType,
  getRightSizeRecommendation
} = require("../src/domain/recommendations/rightSize");

describe("Right-sizing recommendation", () => {
  test("recommends right-sizing when p95 CPU is below threshold", () => {
    expect(shouldRightSize(40)).toBe(true);
  });

  test("does not recommend right-sizing when p95 CPU is above threshold", () => {
    expect(shouldRightSize(80)).toBe(false);
  });

  test("does not recommend right-sizing at the threshold", () => {
    expect(shouldRightSize(65)).toBe(false);
  });

  test("supports a custom threshold", () => {
    expect(shouldRightSize(70, 75)).toBe(true);
    expect(shouldRightSize(80, 75)).toBe(false);
  });

  test("finds a smaller type with the same vCPU", () => {
    expect(
      findSmallerInstanceType("t3.large")
    ).toBe("t3.medium");
  });

  test("finds a smaller type for t3.2xlarge", () => {
    expect(
      findSmallerInstanceType("t3.2xlarge")
    ).toBe("t3.xlarge");
  });

  test("finds no smaller type for the smallest instance", () => {
    expect(
      findSmallerInstanceType("t3.micro")
    ).toBeNull();
  });

  test("rejects an unknown instance type", () => {
    expect(() =>
      findSmallerInstanceType("invalid.type")
    ).toThrow();
  });

  test("returns a complete right-sizing recommendation", () => {
    const result = getRightSizeRecommendation({
      instanceType: "t3.2xlarge",
      p95CpuPercent: 40
    });

    expect(result).toEqual({
      type: "RIGHT_SIZE",
      action: "DOWNSIZE_INSTANCE",
      current: {
        instanceType: "t3.2xlarge",
        p95CpuPercent: 40
      },
      proposed: {
        instanceType: "t3.xlarge"
      },
      reason: expect.any(String)
    });
  });

  test("returns null when right-sizing is not recommended", () => {
    expect(
      getRightSizeRecommendation({
        instanceType: "t3.large",
        p95CpuPercent: 80
      })
    ).toBeNull();
  });

  test("returns null when no smaller instance exists", () => {
    expect(
      getRightSizeRecommendation({
        instanceType: "t3.micro",
        p95CpuPercent: 20
      })
    ).toBeNull();
  });

  test("rejects invalid CPU utilization", () => {
    expect(() => shouldRightSize(120)).toThrow();
  });
});