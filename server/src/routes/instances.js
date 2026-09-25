const express = require("express");
const pool = require("../db/client");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        instance_id,
        instance_type,
        environment,
        region,
        vcpu,
        memory_gb,
        created_at
      FROM instances
      ORDER BY created_at DESC
    `);

    res.json({
      instances: result.rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch instances"
    });
  }
});

module.exports = router;