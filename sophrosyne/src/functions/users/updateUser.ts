import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { response } from '../../utils/response.js';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { userSchema } from '../../schemas/userSchema.js';
import bcrypt from 'bcryptjs';

export async function handler(event: APIGatewayProxyEventV2) {
    const { success, data, error } = userSchema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    if (!success) {
        return response(400, { error: error.message });
    }

    const userId = event.pathParameters?.userId;

    if (!userId) {
        return response(400, { error: 'User ID is required' });
    }

    const { name, email, password } = data;

    // Todo: Verify if the token is from the user

    const hashedPassword = await bcrypt.hash(password, 10);

    const command = new UpdateCommand({
        TableName: process.env.USERS_TABLE,
        Key: {
            id: userId,
        },
        UpdateExpression:
            'set #name = :name, #email = :email, #password = :password',
        ExpressionAttributeValues: {
            ':name': name,
            ':email': email,
            ':password': hashedPassword,
        },
        ExpressionAttributeNames: {
            '#name': 'name',
            '#email': 'email',
            '#password': 'password',
        },
    });

    await dynamoClient.send(command);

    return response(204);
}
