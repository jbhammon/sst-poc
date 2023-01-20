import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import cors from "@middy/http-cors";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

const lambdaHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const stripe = process.env.STRIPE_SECRET_KEY;
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `stripe key: ${stripe}` }),
  };
};

const handler = middy(lambdaHandler)
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true,
      origin: "*",
    })
  );

export { handler };
