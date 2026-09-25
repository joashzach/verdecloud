require("dotenv").config();

const {
  DescribeInstancesCommand
} = require("@aws-sdk/client-ec2");

const { ec2Client } = require("../config/aws");

async function testEc2() {
  try {
    const result = await ec2Client.send(
      new DescribeInstancesCommand({})
    );

    console.log(
      "EC2 connected. Reservations:",
      result.Reservations.length
    );
  } catch (error) {
    console.error("EC2 connection failed:", error.message);
  }
}

testEc2();