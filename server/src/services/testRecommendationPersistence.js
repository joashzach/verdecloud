require("dotenv").config();

const pool = require("../db/client");

const {
  getInstanceRecommendations
} = require("./recommendationService");

const {
  saveRecommendations
} = require("./recommendationPersistence");

async function test() {
  try {
    const result = await getInstanceRecommendations("i-demo-001");

    await saveRecommendations(
      "i-demo-001",
      result.recommendations
    );

    const saved = await pool.query(`
      SELECT
        type,
        action,
        reason,
        current_data,
        proposed_data,
        projected_savings,
        risk
      FROM recommendations
      ORDER BY created_at DESC
      LIMIT 10
    `);

    console.log("Saved recommendations:");
    console.dir(saved.rows, { depth: null });
  } catch (error) {
    console.error(
      "Recommendation persistence failed:",
      error.message
    );
  } finally {
    await pool.end();
  }
}

test();