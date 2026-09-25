const express = require("express");

const {
  getInstanceRecommendations
} = require("../services/recommendationService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { instanceId } = req.query;

    if (!instanceId) {
      return res.status(400).json({
        error: "instanceId query parameter is required"
      });
    }

    const result =
      await getInstanceRecommendations(instanceId);

    return res.json(result);
  } catch (error) {
    console.error(error);

    if (error.message.startsWith("Instance not found")) {
      return res.status(404).json({
        error: error.message
      });
    }

    return res.status(500).json({
      error: "Failed to generate recommendations"
    });
  }
});

module.exports = router;