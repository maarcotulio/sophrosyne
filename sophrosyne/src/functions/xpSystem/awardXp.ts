import type { DynamoDBStreamEvent } from 'aws-lambda';
import { dynamoClient } from '../../clients/dynamoClients.js';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

export async function handler(event: DynamoDBStreamEvent) {
    for (const record of event.Records) {
        const habitCreated =
            record.eventName === 'INSERT' &&
            record.dynamodb?.NewImage?.SK?.S?.includes('HABIT');

        if (habitCreated) {
            const userId = record.dynamodb?.NewImage?.PK?.S?.replace(
                'USER#',
                ''
            );
            const xpReward = record.dynamodb?.NewImage?.xpReward?.N;

            // Get profile
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
                    UpdateExpression: 'set xp = :xp',
                    ExpressionAttributeValues: {
                        ':xp': updatedXp,
                    },
                })
            );
        }
    }
}
