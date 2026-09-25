const express = require("express");
const pool = require("../db/client");

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COALESCE(SUM(energy_kwh), 0) AS total_energy_kwh,
        COALESCE(SUM(carbon_kg), 0) AS total_carbon_kg
      FROM footprints
    `);

    res.json({
      summary: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch footprint summary"
    });
  }
});

module.exports = router;