import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { awardXp } from '../../utils/awardXp.js';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '../../clients/dynamoClients.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const habitId = event.pathParameters?.habitId as string;

    if (!userId || !habitId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing required parameters' }),
        };
    }

    const { Item: habit } = await dynamoClient.send(
        new GetCommand({
            TableName: process.env.SOPHROSYNE,
            Key: {
                PK: `USER#${userId}`,
                SK: `HABIT#${habitId}`,
            },
        })
    );

    if (!habit) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Habit not found' }),
        };
    }

    // Award XP
    await awardXp(userId, habit.xpReward);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Habit completed successfully' }),
    };
}
