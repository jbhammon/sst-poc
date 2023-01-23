import { NextjsSite, StackContext, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { StorageStack } from "./StorageStack";

export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { bucket } = use(StorageStack);

  const frontend = new NextjsSite(stack, "Frontend", {
    path: "frontend",
    environment: {
      NEXT_PUBLIC_REGION: app.region,
      NEXT_PUBLIC_API_URL: api.customDomainUrl || api.url,
      NEXT_PUBLIC_BUCKET: bucket.bucketName,
    },
  });

  stack.addOutputs({
    FrontendUrl: frontend.url,
  });

  return {
    frontend,
  };
}
