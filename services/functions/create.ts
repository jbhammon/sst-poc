import { APIGatewayProxyEventV2 } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as uuid from "uuid";

import dynamoDb from "../util/dynamodb";

export async function main(event: APIGatewayProxyEventV2) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  if (event.body) {
    const data = JSON.parse(event.body);

    const params: DocumentClient.PutItemInput = {
      TableName: process.env.TABLE_NAME ?? "",
      Item: {
        // attributes of what's to be created
        userId: "123", // id of the author
        noteId: uuid.v4(),
        content: data.content, // content of the note
        attachment: data.attachment,
        createdAt: Date.now(),
      },
    };

    try {
      await dynamoDb.put(params);
      return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      };
    } catch {
      return {
        statusCode: 500,
        body: "Internal error",
      };
    }
  }
  // body is missing, return error
  else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Request body is missing" }),
    };
  }
}
