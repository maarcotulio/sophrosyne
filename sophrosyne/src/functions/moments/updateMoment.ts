import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { updateMomentSchema } from '../../schemas/momentSchema.js';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;
    const momentId = event.pathParameters?.momentId;

    if (!userId) {
        return response(401, { error: 'Unauthorized' });
    }

    if (!momentId) {
        return response(400, { error: 'Moment ID is required' });
    }

    const { success, data, error } = updateMomentSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    if (!success) {
        return response(400, { error: error.message });
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
    });

    const queryResult = await dynamoClient.send(queryCommand);

    if (!queryResult.Items || queryResult.Items.length === 0) {
        return response(404, { error: 'Moment not found' });
    }

    const existing = queryResult.Items[0]!;
    const { title, description, emotion, tags } = data;

    // Build update expression dynamically
    const updateExpressionParts: string[] = ['#updatedAt = :updatedAt'];
    const expressionAttributeValues: Record<string, unknown> = {
        ':updatedAt': new Date().toISOString(),
    };
    const expressionAttributeNames: Record<string, string> = {
        '#updatedAt': 'updatedAt',
    };

    if (title !== undefined) {
        updateExpressionParts.push('#title = :title');
        expressionAttributeValues[':title'] = title;
        expressionAttributeNames['#title'] = 'title';
    }

    if (description !== undefined) {
        updateExpressionParts.push('#description = :description');
        expressionAttributeValues[':description'] = description;
        expressionAttributeNames['#description'] = 'description';
    }

    if (emotion !== undefined) {
        updateExpressionParts.push('#emotion = :emotion');
        expressionAttributeValues[':emotion'] = emotion;
        expressionAttributeNames['#emotion'] = 'emotion';
    }

    if (tags !== undefined) {
        updateExpressionParts.push('#tags = :tags');
        expressionAttributeValues[':tags'] = tags;
        expressionAttributeNames['#tags'] = 'tags';
    }

    const updateCommand = new UpdateCommand({
        TableName: process.env.SOPHROSYNE,
        Key: {
            PK: existing.PK as string,
            SK: existing.SK as string,
        },
        UpdateExpression: `SET ${updateExpressionParts.join(', ')}`,
        ExpressionAttributeValues: expressionAttributeValues,
        ExpressionAttributeNames: expressionAttributeNames,
        ReturnValues: 'ALL_NEW',
    });

    const result = await dynamoClient.send(updateCommand);

    return response(200, {
        id: result.Attributes?.id,
        title: result.Attributes?.title,
        description: result.Attributes?.description,
        momentDate: result.Attributes?.momentDate,
        emotion: result.Attributes?.emotion,
        tags: result.Attributes?.tags,
        createdAt: result.Attributes?.createdAt,
        updatedAt: result.Attributes?.updatedAt,
    });
}
