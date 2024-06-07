import { z } from 'zod';

export const Vaccine = z.object({
    vaccineName: z.string().min(3).max(30),
    doseNumber: z.number().int().positive(),
    recommendedAge: z.string(),
    description: z.string().min(3),
});

export const addVaccine = Vaccine;
export const updateVaccine = z.object({
    vaccineName: z.string().min(3).max(30).optional(),
    doseNumber: z.number().int().positive().optional(),
    recommendedAge: z.string().optional(),
    description: z.string().min(3).optional(),
});

export type Vaccine = z.infer<typeof Vaccine>;
