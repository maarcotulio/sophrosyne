import { dynamoClient } from '../clients/dynamoClients.js';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

export interface UserProfile {
    PK: string;
    SK: string;
    email: string;
    xp: number;
    level: number;
    createdAt: string;
}

export async function ensureProfile(
    userId: string,
    email?: string
): Promise<UserProfile> {
    const key = { PK: `USER#${userId}`, SK: 'PROFILE' };

    // Try to get existing profile
    const { Item } = await dynamoClient.send(
        new GetCommand({
            TableName: process.env.SOPHROSYNE,
            Key: key,
        })
    );

    if (Item) {
        return Item as UserProfile;
    }

    // Create new profile
    const profile: UserProfile = {
        PK: `USER#${userId}`,
        SK: 'PROFILE',
        email: email ?? '',
        xp: 0,
        level: 1,
        createdAt: new Date().toISOString(),
    };

    try {
        await dynamoClient.send(
            new PutCommand({
                TableName: process.env.SOPHROSYNE,
                Item: profile,
                ConditionExpression: 'attribute_not_exists(PK)', // Prevent race conditions
            })
        );
    } catch (error: unknown) {
        // If profile was created by another request, fetch and return it
        if (
            error instanceof Error &&
            error.name === 'ConditionalCheckFailedException'
        ) {
            const { Item: existingProfile } = await dynamoClient.send(
                new GetCommand({
                    TableName: process.env.SOPHROSYNE,
                    Key: key,
                })
            );
            return existingProfile as UserProfile;
        }
        throw error;
    }

    return profile;
}
