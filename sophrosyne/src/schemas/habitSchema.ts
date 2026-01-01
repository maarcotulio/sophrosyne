import zod from 'zod';

export const habitSchema = zod.object({
    name: zod.string(),
    xpReward: zod.number(),
    frequency: zod.string(),
    category: zod.string(),
});
