import { dynamoClient } from '../clients/dynamoClients.js';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { calculateLevelUp } from '../shared/game/levelingSystem.js';

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

    const { newLevel, newXP } = calculateLevelUp(
        profile.level,
        profile.xp,
        xpReward
    );

    // Update profile
    await dynamoClient.send(
        new UpdateCommand({
            TableName: process.env.SOPHROSYNE,
            Key: {
                PK: `USER#${userId}`,
                SK: 'PROFILE',
            },
            UpdateExpression: 'set #xp = :xp, #level = :level',
            ExpressionAttributeValues: {
                ':xp': newXP,
                ':level': newLevel,
            },
            ExpressionAttributeNames: {
                '#xp': 'xp',
                '#level': 'level',
            },
        })
    );
}
