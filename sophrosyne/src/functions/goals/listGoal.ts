import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '../../clients/dynamoClients.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    const command = new ScanCommand({
        TableName: process.env.SOPHROSYNE,
        FilterExpression: 'PK = :userId AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':userId': `USER#${userId}`,
            ':sk': 'GOAL#',
        },
    });

    const { Items: goals } = await dynamoClient.send(command);

    return response(200, { goals });
}
