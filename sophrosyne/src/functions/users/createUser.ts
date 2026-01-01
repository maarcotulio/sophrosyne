import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { response } from '../../utils/response.js';
import zod from 'zod';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcryptjs';

const schema = zod.object({
    avatar: zod.string(),
    name: zod.string(),
    email: zod.email(),
    password: zod.string().min(6),
});

export async function handler(event: APIGatewayProxyEventV2) {
    const { success, data, error } = schema.safeParse(
        JSON.parse(event.body ?? '{}')
    );

    if (!success) {
        return response(400, { error: error.message });
    }

    const { avatar, name, email, password } = data;
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const hashedPassword = await bcrypt.hash(password, 10);

    const command = new PutCommand({
        TableName: process.env.USERS_TABLE,
        Item: {
            id,
            avatar,
            name,
            email,
            password: hashedPassword,
            createdAt,
        },
    });

    await dynamoClient.send(command);

    return response(201, { id });
}
