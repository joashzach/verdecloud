const pool = require("../db/client");

async function saveRecommendations(instanceId, recommendations) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const instanceResult = await client.query(
      `
      SELECT id
      FROM instances
      WHERE instance_id = $1
      `,
      [instanceId]
    );

    if (instanceResult.rows.length === 0) {
      throw new Error(`Instance not found: ${instanceId}`);
    }

    const dbInstanceId = instanceResult.rows[0].id;

    // Remove previous recommendations for this instance.
    await client.query(
      `
      DELETE FROM recommendations
      WHERE instance_id = $1
      `,
      [dbInstanceId]
    );

    // Save the current recommendations.
    for (const recommendation of recommendations) {
      await client.query(
        `
        INSERT INTO recommendations (
          instance_id,
          type,
          action,
          reason,
          current_data,
          proposed_data,
          projected_savings,
          risk
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [
          dbInstanceId,
          recommendation.type,
          recommendation.action,
          recommendation.reason,
          recommendation.current
            ? JSON.stringify(recommendation.current)
            : null,
          recommendation.proposed
            ? JSON.stringify(recommendation.proposed)
            : null,
          recommendation.projectedSavings
            ? JSON.stringify(recommendation.projectedSavings)
            : null,
          recommendation.risk
            ? JSON.stringify(recommendation.risk)
            : null
        ]
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  saveRecommendations
};