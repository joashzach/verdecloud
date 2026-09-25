const express = require("express");

const recommendationRoutes =
  require("./routes/recommendations");

const instanceRoutes =
  require("./routes/instances");

const instanceDetailsRoutes =
  require("./routes/instanceDetails");

const footprintRoutes =
  require("./routes/footprint");

const reportRoutes =
  require("./routes/reports");

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "VerdeCloud API"
  });
});

app.use(
  "/api/recommendations",
  recommendationRoutes
);

app.use(
  "/api/instances",
  instanceRoutes
);

app.use(
  "/api/instances",
  instanceDetailsRoutes
);

app.use(
  "/api/footprint",
  footprintRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

module.exports = app;