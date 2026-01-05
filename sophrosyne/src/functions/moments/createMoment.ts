import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { createMomentSchema } from '../../schemas/momentSchema.js';
import { ensureProfile } from '../../utils/ensureProfile.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const email = event.requestContext.authorizer.jwt.claims.email as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    const { success, data, error } = createMomentSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    if (!success) {
        return response(400, { error: error.message });
    }

    // Ensure user profile exists
    await ensureProfile(userId, email);

    const { title, description, momentDate, emotion, tags } = data;

    // Extract date part for SK ordering
    const datePrefix = momentDate.split('T')[0];
    const id = crypto.randomUUID();

    const momentRecord = {
        PK: `USER#${userId}`,
        SK: `MOMENT#${datePrefix}#${id}`,
        id,
        title,
        description,
        momentDate,
        emotion,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const command = new PutCommand({
        TableName: process.env.SOPHROSYNE,
        Item: momentRecord,
    });

    await dynamoClient.send(command);
    return response(201, { id, momentDate: datePrefix });
}
