import zod from 'zod';

export const createSleepSchema = zod.object({
    sleepTime: zod.string().datetime(),
    wakeTime: zod.string().datetime().optional(),
    notes: zod.string().max(500).optional(),
});

export const updateSleepSchema = zod.object({
    wakeTime: zod.string().datetime().optional(),
    notes: zod.string().max(500).optional(),
});
