import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const date = event.pathParameters?.date as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    if (!date) {
        return response(400, { error: 'Date is required' });
    }

    const command = new DeleteCommand({
        TableName: process.env.SOPHROSYNE,
        Key: {
            PK: `USER#${userId}`,
            SK: `SLEEP#${date}`,
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
            return response(404, { error: 'Sleep record not found' });
        }
        throw err;
    }
}
