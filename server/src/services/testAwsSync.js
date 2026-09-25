require("dotenv").config();

const pool = require("../db/client");

const {
  syncAwsInstances
} = require("./awsSyncService");

async function test() {
  try {
    const count = await syncAwsInstances();

    console.log(
      `AWS sync complete. Instances synced: ${count}`
    );
  } catch (error) {
    console.error(
      "AWS sync failed:",
      error.message
    );
  } finally {
    await pool.end();
  }
}

test();