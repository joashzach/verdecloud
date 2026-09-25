require("dotenv").config();

const { fromIni } = require("@aws-sdk/credential-providers");
const { EC2Client } = require("@aws-sdk/client-ec2");
const { CloudWatchClient } = require("@aws-sdk/client-cloudwatch");
const { S3Client } = require("@aws-sdk/client-s3");

const region = process.env.AWS_REGION || "ap-south-1";

const credentials = fromIni({
  profile: "default"
});

const ec2Client = new EC2Client({
  region,
  credentials
});

const cloudWatchClient = new CloudWatchClient({
  region,
  credentials
});

const s3Client = new S3Client({
  region,
  credentials
});

module.exports = {
  ec2Client,
  cloudWatchClient,
  s3Client
};