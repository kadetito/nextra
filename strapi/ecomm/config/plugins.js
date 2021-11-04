module.exports = ({ env }) => ({
  upload: {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: env("AKIAYRCYSFA7RRB7Z7PQ"),
      secretAccessKey: env("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"),
      region: "us-east-1",
      params: {
        Bucket: "storewear",
      },
    },
  },
});
