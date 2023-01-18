import { APIGatewayProxyEventV2 } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import dynamodb from "util/dynamodb";

export async function main(event: APIGatewayProxyEventV2) {
  const params: DocumentClient.GetItemInput = {
    TableName: process.env.TABLE_NAME ?? "",
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: "123",
      noteId: event.pathParameters?.id,
    },
  };

  const result = await dynamodb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
}
