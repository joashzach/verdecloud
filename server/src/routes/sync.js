const express = require("express");

const {
  syncAwsInstances
} = require("../services/awsSyncService");

const router = express.Router();

router.post("/aws", async (req, res) => {
  try {
    const count = await syncAwsInstances();

    res.json({
      status: "success",
      instancesSynced: count
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AWS sync failed"
    });
  }
});

module.exports = router;