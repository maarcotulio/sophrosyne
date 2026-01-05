import zod from 'zod';

// Emotions aligned with journaling/gratitude philosophy
export const emotionEnum = zod.enum([
    'joy',
    'gratitude',
    'pride',
    'peace',
    'love',
    'excitement',
]);

export type Emotion = zod.infer<typeof emotionEnum>;

export const createMomentSchema = zod.object({
    title: zod.string().min(1).max(100),
    description: zod.string().min(1).max(2000),
    momentDate: zod.string().datetime(),
    emotion: emotionEnum.optional(),
    tags: zod.array(zod.string().max(30)).max(5).optional(),
});

export const updateMomentSchema = zod.object({
    title: zod.string().min(1).max(100).optional(),
    description: zod.string().min(1).max(2000).optional(),
    emotion: emotionEnum.optional(),
    tags: zod.array(zod.string().max(30)).max(5).optional(),
});
