import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';

export async function handler(event: APIGatewayProxyEventV2) {
    const id = event.pathParameters?.userId;

    if (!id) {
        return response(400, { error: 'User ID is required' });
    }

    // Todo: Check if the userId is the same as the one in the token

    const command = new DeleteCommand({
        TableName: process.env.USERS_TABLE,
        Key: {
            id,
        },
    });

    await dynamoClient.send(command);

    return response(204);
}
