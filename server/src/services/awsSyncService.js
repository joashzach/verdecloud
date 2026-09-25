const pool = require("../db/client");

const {
  getEc2Instances
} = require("../aws/ec2Collector");

const {
  getCpuMetrics
} = require("../aws/cloudWatchCollector");

const INSTANCE_TYPES =
  require("../data/instanceTypes");

async function syncAwsInstances() {
  const awsInstances = await getEc2Instances();

  for (const instance of awsInstances) {
    const specs = INSTANCE_TYPES[instance.instanceType];

    if (!specs) {
      console.warn(
        `Unknown instance type: ${instance.instanceType}`
      );
      continue;
    }

    const metrics =
      await getCpuMetrics(instance.instanceId);

    await pool.query(
      `
      INSERT INTO instances (
        instance_id,
        instance_type,
        environment,
        region,
        vcpu,
        memory_gb
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (instance_id)
      DO UPDATE SET
        instance_type = EXCLUDED.instance_type,
        region = EXCLUDED.region,
        vcpu = EXCLUDED.vcpu,
        memory_gb = EXCLUDED.memory_gb
      `,
      [
        instance.instanceId,
        instance.instanceType,
        "unknown",
        instance.region,
        specs.vcpu,
        specs.memoryGB
      ]
    );

    const dbInstance =
      await pool.query(
        `
        SELECT id
        FROM instances
        WHERE instance_id = $1
        `,
        [instance.instanceId]
      );

    await pool.query(
      `
      INSERT INTO metrics (
        instance_id,
        cpu_avg_percent,
        cpu_p95_percent,
        network_bytes
      )
      VALUES ($1, $2, $3, $4)
      `,
      [
        dbInstance.rows[0].id,
        metrics.avgCpuPercent,
        metrics.p95CpuPercent,
        0
      ]
    );
  }

  return awsInstances.length;
}

module.exports = {
  syncAwsInstances
};