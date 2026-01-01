import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { DeleteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const habitId = event.pathParameters?.habitId;

    if (!userId) {
        return response(400, { error: 'User ID is required' });
    }

    if (!habitId) {
        return response(400, { error: 'Habit ID is required' });
    }

    const { Item: habitExists } = await dynamoClient.send(
        new GetCommand({
            TableName: process.env.HABITS_TABLE,
            Key: {
                PK: `USER#${userId}`,
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
            PK: `USER#${userId}`,
            SK: `HABIT#${habitId}`,
        },
    });

    await dynamoClient.send(command);

    return response(204);
}
