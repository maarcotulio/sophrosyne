import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const momentId = event.pathParameters?.momentId;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    if (!momentId) {
        return response(400, { error: 'Moment ID is required' });
    }

    // First, find the moment to get its SK
    const queryCommand = new QueryCommand({
        TableName: process.env.SOPHROSYNE,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
        FilterExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':pk': `USER#${userId}`,
            ':skPrefix': 'MOMENT#',
            ':id': momentId,
        },
        ProjectionExpression: 'PK, SK',
    });

    const queryResult = await dynamoClient.send(queryCommand);

    if (!queryResult.Items || queryResult.Items.length === 0) {
        return response(404, { error: 'Moment not found' });
    }

    const existing = queryResult.Items[0]!;

    const deleteCommand = new DeleteCommand({
        TableName: process.env.SOPHROSYNE,
        Key: {
            PK: existing.PK as string,
            SK: existing.SK as string,
        },
    });

    await dynamoClient.send(deleteCommand);

    return response(204);
}
