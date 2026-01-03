import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { awardXp } from '../../utils/awardXp.js';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { response } from '../../utils/response.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const habitId = event.pathParameters?.habitId as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    if (!habitId) {
        return response(400, { error: 'Habit ID is required' });
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

    const { Item: profile } = await dynamoClient.send(
        new GetCommand({
            TableName: process.env.SOPHROSYNE,
            Key: {
                PK: `USER#${userId}`,
                SK: 'PROFILE',
            },
        })
    );

    if (!profile) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Profile not found' }),
        };
    }

    if (habit.nextCompletionDate > new Date().toISOString()) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'You cannot complete this habit yet',
            }),
        };
    }

    // Award XP
    const message = await awardXp({ profile, xpReward: habit.xpReward });

    habit.completedCount += 1;
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    habit.nextCompletionDate = nextDay.toISOString();

    const command = new UpdateCommand({
        TableName: process.env.SOPHROSYNE,
        Key: {
            PK: `USER#${userId}`,
            SK: `HABIT#${habitId}`,
        },
        UpdateExpression:
            'set #completedCount = :completedCount, #nextCompletionDate = :nextCompletionDate',
        ExpressionAttributeValues: {
            ':completedCount': habit.completedCount,
            ':nextCompletionDate': habit.nextCompletionDate,
        },
        ExpressionAttributeNames: {
            '#completedCount': 'completedCount',
            '#nextCompletionDate': 'nextCompletionDate',
        },
    });

    await dynamoClient.send(command);

    return {
        statusCode: 200,
        body: JSON.stringify({ message }),
    };
}
