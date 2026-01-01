import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { habitSchema } from '../../schemas/habitSchema.js';

export async function handler(event: APIGatewayProxyEventV2) {
    const { success, data, error } = habitSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    const userId = event.pathParameters?.userId;

    if (!userId) {
        return response(400, { error: 'User ID is required' });
    }

    if (!success) {
        return response(400, { error: error.message });
    }

    // Check if the user exists
    const { Item: userExists } = await dynamoClient.send(
        new GetCommand({
            TableName: process.env.USERS_TABLE,
            Key: {
                id: userId,
            },
        })
    );

    if (!userExists) {
        return response(404, { error: 'User not found' });
    }

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

    return response(201, { id });
}
