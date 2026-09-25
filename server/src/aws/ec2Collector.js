const {
  DescribeInstancesCommand
} = require("@aws-sdk/client-ec2");

const { ec2Client } = require("../config/aws");

async function getEc2Instances() {
  const result = await ec2Client.send(
    new DescribeInstancesCommand({})
  );

  const instances = [];

  for (const reservation of result.Reservations || []) {
    for (const instance of reservation.Instances || []) {
      instances.push({
        instanceId: instance.InstanceId,
        instanceType: instance.InstanceType,
        state: instance.State?.Name,
        region: process.env.AWS_REGION || "ap-south-1",
        vcpu: null,
        memoryGB: null
      });
    }
  }

  return instances;
}

module.exports = {
  getEc2Instances
};