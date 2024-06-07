import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { PrismaClient } from '@prisma/client';
import { addChild, updateChild, Child } from '../schemas/Child';

const prisma = new PrismaClient();

export const childRoutes = new Hono()
    .get('/getAllChildren', async (c) => {
        const searchValue = c.req.query('search');
        let where = {};

        if (searchValue) {
            where = {
                childName: {
                    contains: searchValue.toLowerCase(),
                },
            };
        }

        const children = await prisma.childInformation.findMany({
            where,
        });

        const filteredChildren = children.filter((child) => {
            return child.childName
                .toLowerCase()
                .includes(searchValue.toLowerCase());
        });
        return c.json({ children: filteredChildren }, 200);
    })
    .post('/addChild', zValidator('json', addChild), async (c) => {
        const childData: Child = c.req.valid('json');
        const child = await prisma.childInformation.create({ data: childData });
        return c.json({ message: 'Child added successfully', child }, 201);
    })
    .put(
        '/updateChild/:childId',
        zValidator('json', updateChild),
        async (c) => {
            const childData: Child = c.req.valid('json');
            const childId = c.req.param('childId');
            if (!childData) {
                return c.json(
                    { message: 'Please provide the child data' },
                    400
                );
            }

            try {
                const child = await prisma.childInformation.update({
                    where: {
                        childId: parseInt(childId),
                    },
                    data: childData,
                });

                return c.json(
                    { message: 'Child updated successfully', child },
                    200
                );
            } catch (error) {
                return c.json({ message: 'Child ID does not exist' }, 404);
            }
        }
    )
    .delete('/deleteChild/:childId', async (c) => {
        const childId = c.req.param('childId');
        try {
            const child = await prisma.childInformation.delete({
                where: {
                    childId: parseInt(childId),
                },
            });
            return c.json(
                { message: 'Child deleted successfully', child },
                200
            );
        } catch (error) {
            return c.json({ message: 'Child ID does not exist' }, 404);
        }
    });
