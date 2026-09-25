const INSTANCE_TYPES = {
  "t3.micro": {
    vcpu: 2,
    memoryGB: 1
  },
  "t3.small": {
    vcpu: 2,
    memoryGB: 2
  },
  "t3.medium": {
    vcpu: 2,
    memoryGB: 4
  },
  "t3.large": {
    vcpu: 2,
    memoryGB: 8
  },
  "t3.xlarge": {
    vcpu: 4,
    memoryGB: 16
  },
  "t3.2xlarge": {
    vcpu: 8,
    memoryGB: 32
  }
};

module.exports = INSTANCE_TYPES;