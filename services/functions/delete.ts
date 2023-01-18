import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import dynamodb from "util/dynamodb";

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.pathParameters?.id) {
    const params: DocumentClient.DeleteItemInput = {
      TableName: process.env.TABLE_NAME ?? "",
      Key: {
        userId: "123",
        noteId: event.pathParameters.id,
      },
    };
    await dynamodb.delete(params);

    return { statusCode: 200, status: true };
  }
  return {
    statusCode: 400,
    body: "Must provide noteId",
  };
};
