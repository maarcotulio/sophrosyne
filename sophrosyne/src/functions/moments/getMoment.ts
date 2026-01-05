import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const momentId = event.pathParameters?.momentId;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    if (!momentId) {
        return response(400, { error: 'Moment ID is required' });
    }

    // Query for the moment using begins_with since we don't know the date prefix
    const command = new QueryCommand({
        TableName: process.env.SOPHROSYNE,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
        FilterExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':pk': `USER#${userId}`,
            ':skPrefix': 'MOMENT#',
            ':id': momentId,
        },
    });

    const result = await dynamoClient.send(command);

    if (!result.Items || result.Items.length === 0) {
        return response(404, { error: 'Moment not found' });
    }

    const item = result.Items[0];

    return response(200, {
        id: item.id,
        title: item.title,
        description: item.description,
        momentDate: item.momentDate,
        emotion: item.emotion,
        tags: item.tags,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    });
}
