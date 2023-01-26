import { Api, StackContext, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }: StackContext) {
  const { table } = use(StorageStack);

  // TODO make this more robust if/when a custom domain is known
  function corsForStage() {
    switch (app.stage) {
      case "prod":
        return ["https://*"];
      default:
        return ["https://*", "http://localhost:3000"];
    }
  }

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
        },
      },
    },
    cors: {
      allowCredentials: true,
      allowOrigins: corsForStage(),
    },
    routes: {
      "POST /notes": {
        authorizer: "iam",
        function: "functions/create.main",
      },
      "GET /notes/{id}": "functions/get.main",
      "GET /notes": "functions/list.main",
      "PUT /notes/{id}": "functions/update.main",
      "DELETE /notes/{id}": "functions/delete.main",
      "POST /billing": "functions/billing.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
