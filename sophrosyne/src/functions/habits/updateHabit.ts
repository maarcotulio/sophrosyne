import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { habitSchema } from '../../schemas/habitSchema.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ensureProfile } from '../../utils/ensureProfile.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const { success, data, error } = habitSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const email = event.requestContext.authorizer.jwt.claims.email as string;
    const habitId = event.pathParameters?.habitId;

    if (!userId) {
        return response(400, { error: 'User ID is required' });
    }

    if (!habitId) {
        return response(400, { error: 'Habit ID is required' });
    }

    if (!success) {
        return response(400, { error: error.message });
    }

    // Ensure user profile exists
    await ensureProfile(userId, email);

    const { Item: habitExists } = await dynamoClient.send(
        new GetCommand({
            TableName: process.env.SOPHROSYNE,
            Key: {
                PK: `USER#${userId}`,
                SK: `HABIT#${habitId}`,
            },
        })
    );

    if (!habitExists) {
        return response(404, { error: 'Habit not found' });
    }

    const { name, xpReward, frequency, category } = data;

    const command = new UpdateCommand({
        TableName: process.env.SOPHROSYNE,
        Key: {
            PK: `USER#${userId}`,
            SK: `HABIT#${habitId}`,
        },
        UpdateExpression:
            'set #name = :name, #xpReward = :xpReward, #frequency = :frequency, #category = :category',
        ExpressionAttributeValues: {
            ':name': name,
            ':xpReward': xpReward,
            ':frequency': frequency,
            ':category': category,
        },
        ExpressionAttributeNames: {
            '#name': 'name',
            '#xpReward': 'xpReward',
            '#frequency': 'frequency',
            '#category': 'category',
        },
    });

    await dynamoClient.send(command);

    return response(204);
}
