import { z } from 'zod';

export const Child = z.object({
    childId: z.number(),
    childName: z.string().min(3).max(80),
    birthDate: z.string().date(),
    birthPlace: z.string().min(3).max(80),
    motherName: z.string().min(3).max(80),
    fatherName: z.string().min(3).max(80),
    birthHeight: z.number().positive(),
    birthWeight: z.number().positive(),
    sex: z.string().min(3).max(10),
});

export const addChild = Child.omit({ childId: true });
export const updateChild = z.object({
    childName: z.string().min(3).max(80).optional(),
    birthDate: z.string().date().optional(),
    birthPlace: z.string().min(3).max(80).optional(),
    motherName: z.string().min(3).max(80).optional(),
    fatherName: z.string().min(3).max(80).optional(),
    birthHeight: z.number().positive().optional(),
    birthWeight: z.number().positive().optional(),
});

export type Child = z.infer<typeof Child>;
