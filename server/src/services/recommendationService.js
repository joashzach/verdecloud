const pool = require("../db/client");

const {
  getRecommendations
} = require("../domain/recommendations/engine");

async function getInstanceRecommendations(instanceId) {
  const result = await pool.query(
    `
    SELECT
      i.id,
      i.instance_id,
      i.instance_type,
      i.environment,
      i.region,
      i.vcpu,
      i.memory_gb,
      m.cpu_avg_percent,
      m.cpu_p95_percent,
      m.network_bytes
    FROM instances i
    LEFT JOIN LATERAL (
      SELECT *
      FROM metrics
      WHERE metrics.instance_id = i.id
      ORDER BY recorded_at DESC
      LIMIT 1
    ) m ON true
    WHERE i.instance_id = $1
    `,
    [instanceId]
  );

  if (result.rows.length === 0) {
    throw new Error(`Instance not found: ${instanceId}`);
  }

  const instance = result.rows[0];

  const recommendations = getRecommendations({
    instanceType: instance.instance_type,

    avgCpuPercent: Number(instance.cpu_avg_percent),
    p95CpuPercent: Number(instance.cpu_p95_percent),
    avgNetworkBytes: Number(instance.network_bytes),

    environment: instance.environment,

    // Demo values for now.
    // These will later come from real collected data/configuration.
    instanceAgeDays: 20,
    outsideWorkingHours: true,

    currentGridIntensity: 0.71,
    alternativeGridIntensity: 0.50,
    workloadFlexible: true,

    // Temporary demo power-model configuration.
    idleWattsPerVcpu: 10,
    maxWattsPerVcpu: 30,
    hoursRunning: 24,
    pue: 1.15
  });

  return {
    instance: {
      id: instance.instance_id,
      type: instance.instance_type,
      environment: instance.environment,
      region: instance.region
    },
    recommendations
  };
}

module.exports = {
  getInstanceRecommendations
};