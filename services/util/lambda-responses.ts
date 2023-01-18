export function success<T>(body: T) {
  return buildResponse<T>(200, body);
}

export function badRequest<T>(body: T) {
  return buildResponse<T>(400, body);
}

export function internalError<T>(body: T) {
  return buildResponse<T>(500, body);
}

export function buildResponse<T>(statusCode: number, body: T) {
  return { statusCode: statusCode, headers: {}, body: JSON.stringify(body) };
}
