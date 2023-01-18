import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import dynamodb from "util/dynamodb";

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.body) {
    const data = JSON.parse(event.body);
    const params: DocumentClient.UpdateItemInput = {
      TableName: process.env.TABLE_NAME ?? "",
      Key: {
        userId: "123",
        noteId: event.pathParameters?.id,
      },
      // 'UpdateExpression' defines the attributes to be updated
      UpdateExpression: "SET content = :content, attachment = :attachment",
      // 'ExpressionAttributeValues' defines the value in the update expression
      ExpressionAttributeValues: {
        ":attachment": data.attachment || null,
        ":content": data.content || null,
      },
      // 'ReturnValues' specifies if and how to return the item's attributes,
      // where ALL_NEW returns all attributes of the item after the update; you
      // can inspect 'result' below to see how it works with different settings
      ReturnValues: "ALL_NEW",
    };
    await dynamodb.update(params);
    return { statusCode: 204, status: true };
  }

  return {
    statusCode: 400,
    body: "Bad request",
  };
};
