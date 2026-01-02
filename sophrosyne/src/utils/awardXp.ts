import { dynamoClient } from '../clients/dynamoClients.js';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { calculateLevelUp } from '../shared/game/levelingSystem.js';

interface AwardXpRequest {
    profile: Record<string, any>;
    xpReward: number;
}

export async function awardXp({ profile, xpReward }: AwardXpRequest) {
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
                PK: `USER#${profile.id}`,
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

    return profile.level === newLevel
        ? 'You have reached a new level!'
        : 'XP awarded successfully!';
}
