import { APIGatewayProxyEventV2 } from "aws-lambda";

export async function main(event: APIGatewayProxyEventV2) {
  const stripe = process.env.STRIPE_SECRET_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `stripe key: ${stripe}` }),
  };
}
