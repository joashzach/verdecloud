const {
  PutObjectCommand,
  GetObjectCommand
} = require("@aws-sdk/client-s3");

const { s3Client } = require("../config/aws");

const BUCKET = process.env.AWS_S3_BUCKET;

async function uploadJson(key, data) {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: JSON.stringify(data),
      ContentType: "application/json"
    })
  );

  return key;
}

async function downloadJson(key) {
  const result = await s3Client.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: key
    })
  );

  const body = await result.Body.transformToString();

  return JSON.parse(body);
}

module.exports = {
  uploadJson,
  downloadJson
};