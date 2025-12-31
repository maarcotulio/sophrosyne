import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { response } from "../../utils/response.js";
import zod from "zod";
import { dynamoClient } from '../../clients/dynamoClients.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

const schema = zod.object({
    habitName: zod.string(),
    habitDescription: zod.string()
})

export async function handler(event: APIGatewayProxyEventV2) {
    const { success, data, error} = schema.safeParse(JSON.parse(event.body ?? "{}"));

    const userId = event.pathParameters?.userId;

    if(!userId) {
        return response(400, { error: "User ID is required" })
    }

    if(!success) {
        return response(400, { error: error.message })
    }

    // TODO: Verify if user exists


    const { habitName, habitDescription } = data;
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const command = new PutCommand({
        TableName: process.env.HABITS_TABLE,
        Item: {
            id,
            userId,
            habitName,
            habitDescription,
            createdAt,
        },
    });

    await dynamoClient.send(command);

    return response(201, { id })
}