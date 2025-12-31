import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { DeleteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

export async function handler(event: APIGatewayProxyEventV2) {
    const id = event.pathParameters?.userId;
    const habitId = event.pathParameters?.habitId;

    if (!id) {
        return response(400, { error: 'User ID is required' });
    }

    if (!habitId) {
        return response(400, { error: 'Habit ID is required' });
    }

    const { Item: habitExists } = await dynamoClient.send(
        new GetCommand({
            TableName: process.env.HABITS_TABLE,
            Key: {
                id: habitId,
                userId: id,
            },
        })
    );

    if (!habitExists) {
        return response(404, { error: 'Habit not found' });
    }

    if (habitExists.userId !== id) {
        return response(403, {
            error: 'You are not authorized to delete this habit',
        });
    }

    const command = new DeleteCommand({
        TableName: process.env.HABITS_TABLE,
        Key: {
            id: habitId,
            userId: id,
        },
    });

    await dynamoClient.send(command);

    return response(204);
}
