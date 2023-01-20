import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import cors from "@middy/http-cors";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as uuid from "uuid";
import createError from "http-errors";

import dynamoDb from "../util/dynamodb";

// TODO figure typing w/ middy's jsonBodyParser and validator middlewares
const lambdaHandler: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.body) {
    const data = JSON.parse(event.body);
    const params: DocumentClient.PutItemInput = {
      TableName: "asdf",
      // TableName: process.env.TABLE_NAME ?? "",
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
        body: "Internal db error",
      };
    }
  }
  return {
    statusCode: 400,
    body: "Missing request body",
  };
};

const handler = middy(lambdaHandler).use(
  cors({
    credentials: true,
    origin: "*",
  })
);

export { handler };
