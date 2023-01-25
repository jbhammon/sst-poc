import { NextjsSite, StackContext, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { StorageStack } from "./StorageStack";

export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { bucket } = use(StorageStack);
  const { auth } = use(AuthStack);

  const frontend = new NextjsSite(stack, "Frontend", {
    path: "frontend",
    environment: {
      NEXT_PUBLIC_REGION: app.region,
      NEXT_PUBLIC_API_URL: api.customDomainUrl || api.url,
      NEXT_PUBLIC_BUCKET: bucket.bucketName,
      NEXT_PUBLIC_USER_POOL_ID: auth.userPoolId,
      NEXT_PUBLIC_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      // TODO How should missing identity pool ID be handled? Will that ever happen?
      NEXT_PUBLIC_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId ?? "",
    },
  });

  stack.addOutputs({
    FrontendUrl: frontend.url,
  });

  return {
    frontend,
  };
}
