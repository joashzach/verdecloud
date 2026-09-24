function calculateCarbonKg(energyKwh, gridIntensity) {
  if (!Number.isFinite(energyKwh) || energyKwh < 0) {
    throw new Error("energyKwh must be a non-negative number");
  }

  if (!Number.isFinite(gridIntensity) || gridIntensity < 0) {
    throw new Error("gridIntensity must be a non-negative number");
  }

  return energyKwh * gridIntensity;
}

module.exports = {
  calculateCarbonKg
};