import type { DynamoDBStreamEvent } from 'aws-lambda';

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
        }
    }
}
