import { Amplify } from "aws-amplify";

export const config = {
  s3: {
    REGION: process.env.NEXT_PUBLIC_REGION,
    BUCKET: process.env.NEXT_PUBLIC_BUCKET,
  },
  apiGateway: {
    REGION: process.env.NEXT_PUBLIC_REGION,
    URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

function configAmplify() {
  Amplify.configure({
    Storage: {
      region: config.s3.REGION,
      bucket: config.s3.BUCKET,
    },
    API: {
      endpoints: [
        {
          name: "notes",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION,
        },
      ],
    },
  });
}

export default configAmplify;
