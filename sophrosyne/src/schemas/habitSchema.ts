import zod from 'zod';

export const habitSchema = zod.object({
    name: zod.string(),
    xpReward: zod.number(),
    category: zod.string(),
});
