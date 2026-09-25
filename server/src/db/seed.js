require("dotenv").config();

const pool = require("./client");

async function seed() {
  try {
    await pool.query("BEGIN");

    await pool.query(`
      INSERT INTO instances
        (instance_id, instance_type, environment, region, vcpu, memory_gb)
      VALUES
        ('i-demo-001', 't3.2xlarge', 'dev', 'ap-south-1', 8, 32),
        ('i-demo-002', 't3.large', 'test', 'ap-south-1', 2, 8),
        ('i-demo-003', 't3.xlarge', 'production', 'ap-south-1', 4, 16)
      ON CONFLICT (instance_id) DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO metrics
        (instance_id, cpu_avg_percent, cpu_p95_percent, network_bytes)
      SELECT id, 2.00, 40.00, 0
      FROM instances
      WHERE instance_id = 'i-demo-001';

      INSERT INTO metrics
        (instance_id, cpu_avg_percent, cpu_p95_percent, network_bytes)
      SELECT id, 3.00, 30.00, 0
      FROM instances
      WHERE instance_id = 'i-demo-002';

      INSERT INTO metrics
        (instance_id, cpu_avg_percent, cpu_p95_percent, network_bytes)
      SELECT id, 45.00, 70.00, 500000
      FROM instances
      WHERE instance_id = 'i-demo-003';
    `);

    await pool.query("COMMIT");

    console.log("Demo data seeded successfully.");
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Seed failed:", error.message);
  } finally {
    await pool.end();
  }
}

seed();