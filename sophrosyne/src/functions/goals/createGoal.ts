import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { goalSchema } from '../../schemas/goalSchema.js';
import { response } from '../../utils/response.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '../../clients/dynamoClients.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const { success, data, error } = goalSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    const userId = event.requestContext.authorizer.jwt.claims.sub as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    if (!success) {
        return response(400, { error: error.message });
    }

    const { name, description } = data;

    const goalId = crypto.randomUUID();
    const goal = {
        PK: `USER#${userId}`,
        SK: `GOAL#${goalId}`,
        id: goalId,
        name,
        description,
        createdAt: new Date().toISOString(),
    };

    const command = new PutCommand({
        TableName: process.env.SOPHROSYNE,
        Item: goal,
    });

    await dynamoClient.send(command);

    return response(201, { id: goal.id });
}
