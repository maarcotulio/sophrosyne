import { z } from 'zod';

export const goalSchema = z.object({
    name: z.string(),
    description: z.string(),
});
