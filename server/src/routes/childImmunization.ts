import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { PrismaClient } from '@prisma/client';
import {
    addChildImmunization,
    updateChildImmunization,
} from '../schemas/ChildImmunization';

const prisma = new PrismaClient();

export const childImmunizationRoute = new Hono()
    .get('/getImmunizations/:id', async (c) => {
        const id = c.req.param('id');
        try {
            const immunizations = await prisma.childImmunization.findMany({
                where: {
                    childId: parseInt(id),
                },
                include: {
                    child: true,
                },
            });
            return c.json({ immunizations: immunizations }, 200);
        } catch (error) {
            return c.json({ message: 'Child Immunizations not found' }, 404);
        }
    })
    .post(
        '/addImmunization',
        zValidator('json', addChildImmunization),
        async (c) => {
            const immunizationData = c.req.valid('json');
            const immunization = await prisma.childImmunization.create({
                data: immunizationData,
            });
            return c.json(
                { message: 'Immunization added successfully', immunization },
                201
            );
        }
    )
    .put(
        '/updateImmunization/:childId/:vaccineDate/:vaccineName',
        zValidator('json', updateChildImmunization),
        async (c) => {
            const immunizationData = c.req.valid('json');
            const vaccineDate = c.req.param('vaccineDate');
            const vaccineName = c.req.param('vaccineName');
            const id = c.req.param('childId');
            if (!immunizationData) {
                return c.json(
                    { message: 'Please provide the immunization data' },
                    400
                );
            }
            try {
                const immunization = await prisma.childImmunization.update({
                    where: {
                        vaccineDate_vaccineName_childId: {
                            vaccineDate: vaccineDate,
                            vaccineName: vaccineName,
                            childId: parseInt(id),
                        },
                    },
                    data: immunizationData,
                });
                return c.json(
                    {
                        message: 'Immunization updated successfully',
                        immunization,
                    },
                    200
                );
            } catch (error) {
                return c.json({ message: 'Immunization not found' }, 404);
            }
        }
    )
    .delete(
        '/deleteImmunization/:childId/:vaccineDate/:vaccineName',
        async (c) => {
            const id = c.req.param('childId');
            const vaccineDate = c.req.param('vaccineDate');
            const vaccineName = c.req.param('vaccineName');
            console.log(vaccineDate, vaccineName, id);

            try {
                await prisma.childImmunization.delete({
                    where: {
                        vaccineDate_vaccineName_childId: {
                            vaccineDate: vaccineDate,
                            vaccineName: vaccineName,
                            childId: parseInt(id),
                        },
                    },
                });
                return c.json(
                    { message: 'Immunization deleted successfully' },
                    200
                );
            } catch (error) {
                return c.json({ message: 'Immunization not found' }, 404);
            }
        }
    );
