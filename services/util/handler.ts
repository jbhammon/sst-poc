import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
  Callback,
  Context,
} from "aws-lambda";

import { success, internalError } from "./lambda-responses";

export default function handler<T>(
  handler: (event: APIGatewayProxyEventV2, context: Context) => Promise<T> | T
) {
  return async (
    event: APIGatewayProxyEventV2,
    context: Context,
    callback: Callback<APIGatewayProxyResultV2>
  ) => {
    try {
      const result = await handler(event, context);
      callback(null, success(result));
    } catch (error) {
      callback(null, internalError(error));
    }
  };
}

// export default function handler(lambda: APIGatewayProxyHandlerV2) {
//   return async function (event: APIGatewayProxyEventV2, context: Context) {
//     let body, statusCode;

//     try {
//       body = await lambda(event, context, () => {});
//       statusCode = 200;
//     } catch (e) {
//       console.error(e);
//       body = { error: e.message };
//       statusCode = 500;
//     }

//     return {
//       statusCode,
//       body: JSON.stringify(body),
//     };
//   };
// }
