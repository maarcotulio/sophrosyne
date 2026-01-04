import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '../../clients/dynamoClients.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const goalId = event.pathParameters?.goalId as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    if (!goalId) {
        return response(400, { error: 'Goal ID is required' });
    }

    const command = new DeleteCommand({
        TableName: process.env.SOPHROSYNE,
        Key: {
            PK: `USER#${userId}`,
            SK: `GOAL#${goalId}`,
        },
        ConditionExpression: 'attribute_exists(SK)',
    });

    try {
        await dynamoClient.send(command);
        return response(204);
    } catch (err: unknown) {
        if (
            (err as { name: string }).name === 'ConditionalCheckFailedException'
        ) {
            return response(404, { error: 'Goal not found' });
        }
        throw err;
    }
}
