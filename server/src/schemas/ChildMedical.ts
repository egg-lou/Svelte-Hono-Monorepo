import { z } from 'zod';

export const ChildMedical = z.object({
    childDiagnosisId: z.number(),
    childId: z.number(),
    diagnosis: z.string(),
    diagnosisDate: z.string(),
    description: z.string(),
});

export const addChildMedical = ChildMedical.omit({ childDiagnosisId: true });
export const updateChildMedical = z.object({
    diagnosis: z.string().optional(),
    diagnosisDate: z.string().optional(),
    description: z.string().optional(),
});

export type ChildMedical = z.infer<typeof ChildMedical>;
