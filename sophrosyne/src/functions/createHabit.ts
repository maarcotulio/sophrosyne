import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { response } from "../utils/response.js";

export async function handler(event: APIGatewayProxyEventV2) {
    return response(200, { message: 'Hello World' })
}