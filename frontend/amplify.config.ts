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

/**
 * This is some pretty hacky stuff. Part of the SST deploy process of a NextJS
 * app puts place holder values in for the env variables we specify in the
 * Frontend stack, like our User Pool ID, and we don't know them til deploy time.
 * SST docs: "Since the actual values are determined at deploy time, you should
 * not rely on the values at build time."
 *
 * Trying to call Amplify.configure() with those placeholder values was causing the
 * Next build step to fail. This check skips trying to configure Amplify if we
 * don't have all the Cognito values in place yet.
 * @returns True if all the Cognito values are available to be used
 */
function _readyToConfig() {
  if (config.cognito.USER_POOL_ID?.includes("{{ NEXT_PUBLIC_USER_POOL")) {
    console.log("Not ready to config");
    return false;
  }
  console.log("Ready to config");
  return true;
}

function configAmplify() {
  if (_readyToConfig()) {
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
}

export default configAmplify;
