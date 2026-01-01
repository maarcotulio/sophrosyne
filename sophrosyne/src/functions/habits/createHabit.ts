import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { habitSchema } from '../../schemas/habitSchema.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const { success, data, error } = habitSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    const userId = event.requestContext.authorizer.jwt.claims.sub as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    if (!success) {
        return response(400, { error: error.message });
    }

    const { name, xpReward, frequency, category } = data;

    const habitId = crypto.randomUUID();
    const habit = {
        PK: `USER#${userId}`,
        SK: `HABIT#${habitId}`,
        id: habitId,
        name,
        xpReward,
        frequency,
        category,
        completedCount: 0,
        createdAt: new Date().toISOString(),
    };

    const command = new PutCommand({
        TableName: process.env.HABITS_TABLE,
        Item: habit,
    });

    await dynamoClient.send(command);

    return response(201, { id: habit.id });
}
