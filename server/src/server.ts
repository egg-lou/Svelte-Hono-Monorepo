import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { vaccineRoutes } from './routes/vaccine';
import { childRoutes } from './routes/child';
import { childImmunizationRoute } from './routes/childImmunization';

const app = new Hono();

app.use(logger());
app.use(cors());
app.get('/', (c) => {
    return c.json({ message: 'Server is running....' }, 200);
});

app.route('/vaccines', vaccineRoutes);
app.route('/children', childRoutes);
app.route('/immunizations', childImmunizationRoute);
const port = 3000;
console.log(`Server is running on port http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
