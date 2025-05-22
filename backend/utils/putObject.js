const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./awsCredentials");
require("dotenv").config();

exports.putObject = async (file, fileName) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${fileName}`,
      Body: file,
      ContentType: "image/jpg,jpeg,png",
    };
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);

    if (data.$metadata.httpStatusCode !== 200) {
      return;
    }
    let url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    return { url, key: params.Key };
  } catch (err) {
    console.error(err);
  }
};
