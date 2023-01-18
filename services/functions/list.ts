import { APIGatewayProxyEventV2 } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import dynamodb from "util/dynamodb";

export async function main(event: APIGatewayProxyEventV2) {
  const params: DocumentClient.QueryInput = {
    TableName: process.env.TABLE_NAME ?? "",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };

  const result = await dynamodb.query(params);

  return result.Items;
}
