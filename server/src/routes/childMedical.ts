import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { PrismaClient } from '@prisma/client';
import {
    addChildMedical,
    updateChildMedical,
    ChildMedical,
} from '../schemas/ChildMedical';

const prisma = new PrismaClient();

export const childMedicalRoute = new Hono()
    .get('/getMedicals/:id', async (c) => {
        const id = c.req.param('id');
        try {
            const medicals = await prisma.childMedicalHistory.findMany({
                where: {
                    childId: parseInt(id),
                },
                include: {
                    child: true,
                },
            });
            return c.json({ medicals: medicals }, 200);
        } catch (error) {
            return c.json({ message: 'Child Medicals not found' }, 404);
        }
    })
    .post('/addMedical', zValidator('json', addChildMedical), async (c) => {
        const medicalData = c.req.valid('json');
        const medical = await prisma.childMedicalHistory.create({
            data: medicalData,
        });
        return c.json({ message: 'Medical added successfully', medical }, 201);
    })
    .put(
        '/updateMedical/:id',
        zValidator('json', updateChildMedical),
        async (c) => {
            const medicalData = c.req.valid('json');
            const id = c.req.param('id');
            if (!medicalData) {
                return c.json(
                    { message: 'Please provide the medical data' },
                    400
                );
            }

            try {
                const medical = await prisma.childMedicalHistory.update({
                    where: {
                        childDiagnosisId: parseInt(id),
                    },
                    data: medicalData,
                });
                return c.json(
                    { message: 'Medical updated successfully', medical },
                    200
                );
            } catch (error) {
                return c.json({ message: 'Medical not found' }, 404);
            }
        }
    )
    .delete('/deleteMedical/:id', async (c) => {
        const id = c.req.param('id');
        try {
            await prisma.childMedicalHistory.delete({
                where: {
                    childDiagnosisId: parseInt(id),
                },
            });
            return c.json({ message: 'Medical deleted successfully' }, 200);
        } catch (error) {
            return c.json({ message: 'Medical not found' }, 404);
        }
    });
