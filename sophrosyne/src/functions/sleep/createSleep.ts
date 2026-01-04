import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { createSleepSchema } from '../../schemas/sleepSchema.js';
import { ensureProfile } from '../../utils/ensureProfile.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const email = event.requestContext.authorizer.jwt.claims.email as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    const { success, data, error } = createSleepSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    if (!success) {
        return response(400, { error: error.message });
    }

    // Ensure user profile exists
    await ensureProfile(userId, email);

    const { sleepTime, wakeTime, notes } = data;

    // Extract date from sleepTime for SK (YYYY-MM-DD)
    const sleepDate = sleepTime.split('T')[0];
    const id = crypto.randomUUID();

    // Calculate duration if wakeTime is provided
    let duration: number | undefined;
    if (wakeTime) {
        const sleepMs = new Date(sleepTime).getTime();
        const wakeMs = new Date(wakeTime).getTime();
        duration = Math.round((wakeMs - sleepMs) / (1000 * 60)); // minutes
    }

    const sleepRecord = {
        PK: `USER#${userId}`,
        SK: `SLEEP#${sleepDate}`,
        id,
        sleepTime,
        wakeTime,
        duration,
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const command = new PutCommand({
        TableName: process.env.SOPHROSYNE,
        Item: sleepRecord,
        ConditionExpression: 'attribute_not_exists(SK)',
    });

    try {
        await dynamoClient.send(command);
        return response(201, { id, date: sleepDate });
    } catch (err: unknown) {
        if (
            (err as { name: string }).name === 'ConditionalCheckFailedException'
        ) {
            return response(409, {
                error: 'Sleep record for this date already exists',
            });
        }
        throw err;
    }
}
