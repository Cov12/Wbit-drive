import { S3Client, PutBucketCorsCommand, GetBucketCorsCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto",
  endpoint: "https://344b10980ab88b286f64605bb44fcf7f.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "fa3dace13a30192d80a73d4b93f806bc",
    secretAccessKey: "f6624315c236dec003a1b778fed11e01bae1afbb064abe6d5fc7e3c5783ad36b",
  },
});

// Set CORS
await client.send(new PutBucketCorsCommand({
  Bucket: "wbit-drive",
  CORSConfiguration: {
    CORSRules: [
      {
        AllowedOrigins: ["https://drive.wbit.app", "https://wbit-drive-28xh.onrender.com"],
        AllowedMethods: ["GET", "PUT", "HEAD"],
        AllowedHeaders: ["*"],
        ExposeHeaders: ["ETag"],
        MaxAgeSeconds: 3600,
      },
    ],
  },
}));

console.log("CORS set successfully");

// Verify
const result = await client.send(new GetBucketCorsCommand({ Bucket: "wbit-drive" }));
console.log(JSON.stringify(result.CORSRules, null, 2));
