import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ensureProfile } from '../../utils/ensureProfile.js';
import { goalSchema } from '../../schemas/goalSchema.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const { success, data, error } = goalSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const email = event.requestContext.authorizer.jwt.claims.email as string;
    const goalId = event.pathParameters?.goalId;

    if (!userId) {
        return response(400, { error: 'User ID is required' });
    }

    if (!goalId) {
        return response(400, { error: 'Goal ID is required' });
    }

    if (!success) {
        return response(400, { error: error.message });
    }

    // Ensure user profile exists
    await ensureProfile(userId, email);

    const { Item: goalExists } = await dynamoClient.send(
        new GetCommand({
            TableName: process.env.SOPHROSYNE,
            Key: {
                PK: `USER#${userId}`,
                SK: `GOAL#${goalId}`,
            },
        })
    );

    if (!goalExists) {
        return response(404, { error: 'Goal not found' });
    }

    const { name, description } = data;

    const command = new UpdateCommand({
        TableName: process.env.SOPHROSYNE,
        Key: {
            PK: `USER#${userId}`,
            SK: `GOAL#${goalId}`,
        },
        UpdateExpression: 'set #name = :name, #description = :description',
        ExpressionAttributeValues: {
            ':name': name,
            ':description': description,
        },
        ExpressionAttributeNames: {
            '#name': 'name',
            '#description': 'description',
        },
    });

    await dynamoClient.send(command);

    return response(204);
}
