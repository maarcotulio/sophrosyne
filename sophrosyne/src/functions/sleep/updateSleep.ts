import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { updateSleepSchema } from '../../schemas/sleepSchema.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const date = event.pathParameters?.date as string;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    if (!date) {
        return response(400, { error: 'Date is required' });
    }

    const { success, data, error } = updateSleepSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    if (!success) {
        return response(400, { error: error.message });
    }

    // Get existing record to calculate duration
    const { Item: existing } = await dynamoClient.send(
        new GetCommand({
            TableName: process.env.SOPHROSYNE,
            Key: {
                PK: `USER#${userId}`,
                SK: `SLEEP#${date}`,
            },
        })
    );

    if (!existing) {
        return response(404, { error: 'Sleep record not found' });
    }

    const { wakeTime, notes } = data;

    // Build update expression dynamically
    const updateExpressionParts: string[] = ['#updatedAt = :updatedAt'];
    const expressionAttributeValues: Record<string, unknown> = {
        ':updatedAt': new Date().toISOString(),
    };
    const expressionAttributeNames: Record<string, string> = {
        '#updatedAt': 'updatedAt',
    };

    if (wakeTime !== undefined) {
        updateExpressionParts.push('#wakeTime = :wakeTime');
        expressionAttributeValues[':wakeTime'] = wakeTime;
        expressionAttributeNames['#wakeTime'] = 'wakeTime';

        // Calculate duration
        const sleepMs = new Date(existing.sleepTime).getTime();
        const wakeMs = new Date(wakeTime).getTime();
        const duration = Math.round((wakeMs - sleepMs) / (1000 * 60)); // minutes

        updateExpressionParts.push('#duration = :duration');
        expressionAttributeValues[':duration'] = duration;
        expressionAttributeNames['#duration'] = 'duration';
    }

    if (notes !== undefined) {
        updateExpressionParts.push('#notes = :notes');
        expressionAttributeValues[':notes'] = notes;
        expressionAttributeNames['#notes'] = 'notes';
    }

    const command = new UpdateCommand({
        TableName: process.env.SOPHROSYNE,
        Key: {
            PK: `USER#${userId}`,
            SK: `SLEEP#${date}`,
        },
        UpdateExpression: `SET ${updateExpressionParts.join(', ')}`,
        ExpressionAttributeValues: expressionAttributeValues,
        ExpressionAttributeNames: expressionAttributeNames,
        ReturnValues: 'ALL_NEW',
    });

    const result = await dynamoClient.send(command);

    return response(200, { record: result.Attributes });
}
