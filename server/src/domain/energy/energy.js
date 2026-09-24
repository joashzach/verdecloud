function calculateEnergyKwh(totalWatts, hoursRunning, pue = 1.15) {
  if (!Number.isFinite(totalWatts) || totalWatts < 0) {
    throw new Error("totalWatts must be a non-negative number");
  }

  if (!Number.isFinite(hoursRunning) || hoursRunning < 0) {
    throw new Error("hoursRunning must be a non-negative number");
  }

  if (!Number.isFinite(pue) || pue < 1) {
    throw new Error("pue must be a number greater than or equal to 1");
  }

  return (totalWatts / 1000) * hoursRunning * pue;
}

module.exports = {
  calculateEnergyKwh
};