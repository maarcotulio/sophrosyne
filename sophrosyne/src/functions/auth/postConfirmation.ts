import type { PostConfirmationTriggerEvent } from 'aws-lambda';

export const handler = async (event: PostConfirmationTriggerEvent) => {
    // Get the data from user
    console.log(
        'Post Confirmation Trigger Event:',
        JSON.stringify(event, null, 2)
    );

    // IMPORTANT: Must return the event for Cognito to complete the flow
    return event;
};
