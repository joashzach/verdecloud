const {
  calculateTotalPower
} = require("./power");

const { calculateEnergyKwh } = require("./energy");
const { calculateCarbonKg } = require("./carbon");

function calculateRightSizeSavings({
  currentInstance,
  proposedInstance,
  currentCpuUtilization,
  idleWattsPerVcpu,
  maxWattsPerVcpu,
  hoursRunning,
  pue,
  gridIntensity
}) {
  if (!currentInstance || !proposedInstance) {
    throw new Error("currentInstance and proposedInstance are required");
  }

  if (
    !Number.isFinite(currentCpuUtilization) ||
    currentCpuUtilization < 0 ||
    currentCpuUtilization > 100
  ) {
    throw new Error(
      "currentCpuUtilization must be between 0 and 100"
    );
  }

  // Preserve the same workload when moving to fewer vCPUs.
  const workload =
    currentInstance.vcpu *
    (currentCpuUtilization / 100);

  const proposedCpuUtilization =
    (workload / proposedInstance.vcpu) * 100;

  if (proposedCpuUtilization > 100) {
    throw new Error(
      "Proposed instance cannot handle the estimated workload"
    );
  }

  const currentPower = calculateTotalPower({
    vcpu: currentInstance.vcpu,
    cpuUtilization: currentCpuUtilization,
    memoryGB: currentInstance.memoryGB,
    idleWattsPerVcpu,
    maxWattsPerVcpu
  });

  const proposedPower = calculateTotalPower({
    vcpu: proposedInstance.vcpu,
    cpuUtilization: proposedCpuUtilization,
    memoryGB: proposedInstance.memoryGB,
    idleWattsPerVcpu,
    maxWattsPerVcpu
  });

  const currentEnergy = calculateEnergyKwh(
    currentPower.totalWatts,
    hoursRunning,
    pue
  );

  const proposedEnergy = calculateEnergyKwh(
    proposedPower.totalWatts,
    hoursRunning,
    pue
  );

  const currentCarbon = calculateCarbonKg(
    currentEnergy,
    gridIntensity
  );

  const proposedCarbon = calculateCarbonKg(
    proposedEnergy,
    gridIntensity
  );

  return {
    current: {
      energyKwh: currentEnergy,
      carbonKg: currentCarbon
    },

    proposed: {
      energyKwh: proposedEnergy,
      carbonKg: proposedCarbon,
      cpuUtilization: proposedCpuUtilization
    },

    savings: {
      energyKwh: currentEnergy - proposedEnergy,
      carbonKg: currentCarbon - proposedCarbon
    }
  };
}

module.exports = {
  calculateRightSizeSavings
};