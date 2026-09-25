require("dotenv").config();

const pool = require("./client");

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("PostgreSQL connected:", result.rows[0]);

    await pool.end();
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
  }
}

testConnection();