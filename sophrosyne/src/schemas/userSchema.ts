import zod from 'zod';

export const userSchema = zod.object({
    avatar: zod.string(),
    name: zod.string(),
    email: zod.email(),
    password: zod.string().min(6),
});
