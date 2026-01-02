import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { habitSchema } from '../../schemas/habitSchema.js';
import { ensureProfile } from '../../utils/ensureProfile.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const { success, data, error } = habitSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const email = event.requestContext.authorizer.jwt.claims.email as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    // Ensure user profile exists
    await ensureProfile(userId, email);

    if (!success) {
        return response(400, { error: error.message });
    }

    const { name, xpReward, category } = data;

    const habitId = crypto.randomUUID();
    const habit = {
        PK: `USER#${userId}`,
        SK: `HABIT#${habitId}`,
        id: habitId,
        name,
        xpReward,
        category,
        completedCount: 0,
        createdAt: new Date().toISOString(),
        nextCompletionDate: new Date().toISOString(),
    };

    const command = new PutCommand({
        TableName: process.env.SOPHROSYNE,
        Item: habit,
    });

    await dynamoClient.send(command);

    return response(201, { id: habit.id });
}
