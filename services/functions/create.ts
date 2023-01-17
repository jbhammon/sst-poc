import {
  // APIGatewayProxyHandlerV2,
  APIGatewayProxyEventV2,
} from "aws-lambda";
import AWS from "aws-sdk";
import * as uuid from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Another way to type/define this:
// export const main: APIGatewayProxyHandlerV2 = async (event) => {}

export async function main(event: APIGatewayProxyEventV2) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  if (event.body) {
    const data = JSON.parse(event.body);

    const params = {
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
      await dynamoDb.put(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      };
    } catch (e: unknown) {
      if (e instanceof Error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: e.message }),
        };
      }
      return {
        statusCode: 500,
        body: JSON.stringify(e),
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