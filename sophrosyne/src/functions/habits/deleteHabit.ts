import type { APIGatewayProxyEvent } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { DeleteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

export async function handler(event: APIGatewayProxyEvent) {
    const id = event.requestContext.authorizer?.claims.sub;
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
                PK: `USER#${id}`,
                SK: `HABIT#${habitId}`,
            },
        })
    );

    if (!habitExists) {
        return response(404, { error: 'Habit not found' });
    }

    const command = new DeleteCommand({
        TableName: process.env.HABITS_TABLE,
        Key: {
            PK: `USER#${id}`,
            SK: `HABIT#${habitId}`,
        },
    });

    await dynamoClient.send(command);

    return response(204);
}
