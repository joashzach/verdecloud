CREATE TABLE IF NOT EXISTS instances (
    id SERIAL PRIMARY KEY,
    instance_id VARCHAR(100) UNIQUE NOT NULL,
    instance_type VARCHAR(50) NOT NULL,
    environment VARCHAR(50),
    region VARCHAR(50),
    vcpu INTEGER NOT NULL,
    memory_gb NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    instance_id INTEGER NOT NULL REFERENCES instances(id) ON DELETE CASCADE,
    cpu_avg_percent NUMERIC(5,2),
    cpu_p95_percent NUMERIC(5,2),
    network_bytes BIGINT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    instance_id INTEGER NOT NULL REFERENCES instances(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    reason TEXT,
    current_data JSONB,
    proposed_data JSONB,
    projected_savings JSONB,
    risk JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS footprints (
    id SERIAL PRIMARY KEY,
    instance_id INTEGER NOT NULL REFERENCES instances(id) ON DELETE CASCADE,
    energy_kwh NUMERIC(12,4) NOT NULL,
    carbon_kg NUMERIC(12,4) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);