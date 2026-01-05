import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    // Query for the moment using begins_with since we don't know the date prefix
    const command = new QueryCommand({
        TableName: process.env.SOPHROSYNE,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
        ExpressionAttributeValues: {
            ':pk': `USER#${userId}`,
            ':skPrefix': 'MOMENT#',
        },
    });

    const { Items: moments } = await dynamoClient.send(command);

    if (!moments || moments.length === 0) {
        return response(404, { error: 'Moment not found' });
    }

    return response(200, { moments });
}
