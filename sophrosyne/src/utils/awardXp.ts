import { dynamoClient } from '../clients/dynamoClients.js';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

export async function awardXp(userId: string, xpReward: number) {
    const { Item: profile } = await dynamoClient.send(
        new GetCommand({
            TableName: process.env.SOPHROSYNE,
            Key: {
                PK: `USER#${userId}`,
                SK: 'PROFILE',
            },
        })
    );

    if (!profile) {
        return;
    }

    const { xp } = profile;

    const updatedXp = xp + xpReward;

    // Update profile
    await dynamoClient.send(
        new UpdateCommand({
            TableName: process.env.SOPHROSYNE,
            Key: {
                PK: `USER#${userId}`,
                SK: 'PROFILE',
            },
            UpdateExpression: 'set #xp = :xp',
            ExpressionAttributeValues: {
                ':xp': updatedXp,
            },
            ExpressionAttributeNames: {
                '#xp': 'xp',
            },
        })
    );
}
