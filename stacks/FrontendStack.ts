import { NextjsSite, StackContext, use } from "@serverless-stack/resources";

export function FrontendStack({ stack, app }: StackContext) {
  const frontend = new NextjsSite(stack, "Frontend", {
    path: "frontend",
  });

  stack.addOutputs({
    FrontendUrl: frontend.url,
  });

  return {
    frontend,
  };
}
