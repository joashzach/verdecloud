require("dotenv").config();

const {
  getInstanceRecommendations
} = require("./recommendationService");

async function test() {
  try {
    const result = await getInstanceRecommendations("i-demo-001");

    console.dir(result, { depth: null });
  } catch (error) {
    console.error("Recommendation service failed:", error.message);
  }
}

test();