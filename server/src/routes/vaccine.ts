import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { PrismaClient } from '@prisma/client';
import { addVaccine, updateVaccine, Vaccine } from '../schemas/Vaccine';

const prisma = new PrismaClient();

export const vaccineRoutes = new Hono()
    .get('/getAllVaccines', async (c) => {
        const searchValue = c.req.query('search');

        let where = {};

        if (searchValue) {
            where = {
                vaccineName: {
                    contains: searchValue.toLowerCase(),
                },
            };
        }

        const vaccines = await prisma.vaccine.findMany({
            where,
        });

        const filteredVaccines = vaccines.filter((vaccine) => {
            // @ts-ignore
            return vaccine.vaccineName
                .toLowerCase()
                .includes(searchValue.toLowerCase());
        });
        return c.json({ vaccines: filteredVaccines }, 200);
    })
    .post('/addVaccine', zValidator('json', addVaccine), async (c) => {
        const vaccineData: Vaccine = c.req.valid('json');
        const vaccine = await prisma.vaccine.create({ data: vaccineData });
        return c.json({ message: 'Vaccine added successfully', vaccine }, 201);
    })
    .put(
        '/updateVaccine/:vaccineName',
        zValidator('json', updateVaccine),
        async (c) => {
            // @ts-ignore
            const vaccineData: Vaccine | undefined = c.req.valid('json');
            const vaccineName = c.req.param('vaccineName');
            if (!vaccineData) {
                return c.json(
                    { message: 'Please provide the vaccine data' },
                    400
                );
            }

            try {
                const vaccine = await prisma.vaccine.update({
                    where: {
                        vaccineName,
                    },
                    data: vaccineData,
                });
                return c.json(
                    { message: 'Vaccine updated successfully', vaccine },
                    200
                );
            } catch (error) {
                return c.json({ message: 'Vaccine Name does not exist' }, 404);
            }
        }
    )
    .delete('/deleteVaccine/:vaccineName', async (c) => {
        const vaccineName = c.req.param('vaccineName');

        try {
            const vaccine = await prisma.vaccine.delete({
                where: {
                    vaccineName,
                },
            });
            return c.json(
                { message: 'Vaccine deleted successfully', vaccine },
                200
            );
        } catch (error) {
            return c.json({ message: 'Vaccine Name does not exist' }, 404);
        }
    });
