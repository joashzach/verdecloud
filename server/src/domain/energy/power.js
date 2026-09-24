function calculateCpuPower({
  vcpu,
  cpuUtilization,
  idleWattsPerVcpu,
  maxWattsPerVcpu
}) {
  if (!Number.isFinite(vcpu) || vcpu <= 0) {
    throw new Error("vcpu must be a positive number");
  }

  if (!Number.isFinite(cpuUtilization) || cpuUtilization < 0 || cpuUtilization > 100) {
    throw new Error("cpuUtilization must be between 0 and 100");
  }

  if (!Number.isFinite(idleWattsPerVcpu) || idleWattsPerVcpu < 0) {
    throw new Error("idleWattsPerVcpu must be a non-negative number");
  }

  if (!Number.isFinite(maxWattsPerVcpu) || maxWattsPerVcpu < idleWattsPerVcpu) {
    throw new Error(
      "maxWattsPerVcpu must be greater than or equal to idleWattsPerVcpu"
    );
  }

  const utilization = cpuUtilization / 100;

  return (
    vcpu *
    (
      idleWattsPerVcpu +
      utilization * (maxWattsPerVcpu - idleWattsPerVcpu)
    )
  );
}


function calculateMemoryPower(memoryGB) {
  if (!Number.isFinite(memoryGB) || memoryGB < 0) {
    throw new Error("memoryGB must be a non-negative number");
  }

  const WATTS_PER_GB = 0.392;

  return memoryGB * WATTS_PER_GB;
}


function calculateTotalPower({
  vcpu,
  cpuUtilization,
  memoryGB,
  idleWattsPerVcpu,
  maxWattsPerVcpu
}) {
  const cpuPower = calculateCpuPower({
    vcpu,
    cpuUtilization,
    idleWattsPerVcpu,
    maxWattsPerVcpu
  });

  const memoryPower = calculateMemoryPower(memoryGB);

  return {
    cpuWatts: cpuPower,
    memoryWatts: memoryPower,
    totalWatts: cpuPower + memoryPower
  };
}


module.exports = {
  calculateCpuPower,
  calculateMemoryPower,
  calculateTotalPower
};