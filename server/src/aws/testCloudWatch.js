const {
  getCpuMetrics
} = require("./cloudWatchCollector");

async function test() {
  try {
    const metrics = await getCpuMetrics(
      "i-039ca254bf49bc6c4"
    );

    console.log("CPU metrics:", metrics);
  } catch (error) {
    console.error(
      "CloudWatch collector failed:",
      error.message
    );
  }
}

test();