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
  cognito: {
    REGION: process.env.NEXT_PUBLIC_REGION,
    USER_POOL_ID: process.env.NEXT_PUBLIC_USER_POOL_ID,
    APP_CLIENT_ID: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
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
    Auth: {
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    },
    ssr: true,
  });
}

export default configAmplify;
