import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { habitSchema } from '../../schemas/habitSchema.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

export async function handler(event: APIGatewayProxyEventV2) {
    const { success, data, error } = habitSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    const userId = event.pathParameters?.userId;
    const habitId = event.pathParameters?.habitId;

    if (!userId) {
        return response(400, { error: 'User ID is required' });
    }

    if (!habitId) {
        return response(400, { error: 'Habit ID is required' });
    }

    if (!success) {
        return response(400, { error: error.message });
    }

    const { Item: habitExists } = await dynamoClient.send(
        new GetCommand({
            TableName: process.env.HABITS_TABLE,
            Key: {
                id: habitId,
                userId: userId,
            },
        })
    );

    if (!habitExists) {
        return response(404, { error: 'Habit not found' });
    }

    if (habitExists.userId !== userId) {
        return response(403, {
            error: 'You are not authorized to update this habit',
        });
    }

    const { habitName, habitDescription } = data;

    const command = new UpdateCommand({
        TableName: process.env.HABITS_TABLE,
        Key: {
            id: habitId,
            userId: userId,
        },
        UpdateExpression:
            'set #habitName = :habitName, #habitDescription = :habitDescription',
        ExpressionAttributeValues: {
            ':habitName': habitName,
            ':habitDescription': habitDescription,
        },
        ExpressionAttributeNames: {
            '#habitName': 'habitName',
            '#habitDescription': 'habitDescription',
        },
    });

    await dynamoClient.send(command);

    return response(204);
}
