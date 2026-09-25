require("dotenv").config();

const {
  getEc2Instances
} = require("./ec2Collector");

async function test() {
  try {
    const instances = await getEc2Instances();

    console.dir(instances, { depth: null });
  } catch (error) {
    console.error(
      "EC2 collector failed:",
      error.message
    );
  }
}

test();