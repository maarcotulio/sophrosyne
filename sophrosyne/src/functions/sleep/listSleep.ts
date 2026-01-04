import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    const startDate = event.queryStringParameters?.startDate;
    const endDate = event.queryStringParameters?.endDate;

    // Build query - filter by date range if provided
    let keyConditionExpression = 'PK = :pk AND begins_with(SK, :skPrefix)';
    const expressionAttributeValues: Record<string, unknown> = {
        ':pk': `USER#${userId}`,
        ':skPrefix': 'SLEEP#',
    };

    // If date range provided, use BETWEEN for more efficient query
    if (startDate && endDate) {
        keyConditionExpression = 'PK = :pk AND SK BETWEEN :skStart AND :skEnd';
        expressionAttributeValues[':skStart'] = `SLEEP#${startDate}`;
        expressionAttributeValues[':skEnd'] = `SLEEP#${endDate}`;
        delete expressionAttributeValues[':skPrefix'];
    }

    const command = new QueryCommand({
        TableName: process.env.SOPHROSYNE,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ScanIndexForward: false, // Most recent first
    });

    const result = await dynamoClient.send(command);

    // Transform records for response (remove PK/SK from response)
    const records = (result.Items ?? []).map((item) => ({
        id: item.id,
        date: (item.SK as string).replace('SLEEP#', ''),
        sleepTime: item.sleepTime,
        wakeTime: item.wakeTime,
        duration: item.duration,
        notes: item.notes,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    }));

    return response(200, { records, count: records.length });
}
