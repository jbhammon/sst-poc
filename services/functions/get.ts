import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import dynamodb from "util/dynamodb";

export const main: APIGatewayProxyHandlerV2 = async (event) => {
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
    return {
      statusCode: 404,
      body: "Note does not exist",
    };
  }

  return result.Item;
};
