require("dotenv").config();

const {
  uploadJson,
  downloadJson
} = require("./s3Storage");

async function test() {
  try {
    const key = "test/verdecloud-test.json";

    const data = {
      project: "VerdeCloud",
      status: "s3-working"
    };

    await uploadJson(key, data);

    console.log("S3 upload successful");

    const downloaded = await downloadJson(key);

    console.log("S3 download successful:");
    console.dir(downloaded, { depth: null });
  } catch (error) {
    console.error("S3 test failed:", error.message);
  }
}

test();