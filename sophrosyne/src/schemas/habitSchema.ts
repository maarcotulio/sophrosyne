import zod from 'zod';

export const habitSchema = zod.object({
    habitName: zod.string(),
    habitDescription: zod.string(),
});
