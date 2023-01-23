const config = {
  s3: {
    REGION: process.env.NEXT_PUBLIC_REGION,
    BUCKET: process.env.NEXT_PUBLIC_BUCKET,
  },
  apiGateway: {
    REGION: process.env.NEXT_PUBLIC_REGION,
    URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default config;
