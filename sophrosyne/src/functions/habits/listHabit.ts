import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ensureProfile } from '../../utils/ensureProfile.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const email = event.requestContext.authorizer.jwt.claims.email as string;

    if (!userId) {
        return response(400, { error: 'User ID is required' });
    }

    // Ensure user profile exists
    await ensureProfile(userId, email);

    const { Items: habits } = await dynamoClient.send(
        new QueryCommand({
            TableName: process.env.SOPHROSYNE,
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':pk': `USER#${userId}`,
                ':sk': 'HABIT#',
            },
        })
    );

    return response(200, { habits: habits ?? [] });
}
