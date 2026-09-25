const express = require("express");
const pool = require("../db/client");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        instance_id,
        instance_type,
        environment,
        region,
        vcpu,
        memory_gb,
        created_at
      FROM instances
      WHERE instance_id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Instance not found"
      });
    }

    res.json({
      instance: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch instance"
    });
  }
});

module.exports = router;