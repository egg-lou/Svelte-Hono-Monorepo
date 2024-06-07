import { z } from 'zod';

export const ChildImmunization = z.object({
    vaccineDate: z.string().date(),
    vaccineName: z.string(),
    childId: z.number(),
    nextVisitDate: z.string().date(),
    remarks: z.string(),
});

export const addChildImmunization = ChildImmunization.omit({ childId: true });
export const updateChildImmunization = z.object({
    vaccineDate: z.string().date().optional(),
    vaccineName: z.string().optional(),
    nextVisitDate: z.string().date().optional(),
    remarks: z.string().optional(),
});

export type ChildImmunization = z.infer<typeof ChildImmunization>;
