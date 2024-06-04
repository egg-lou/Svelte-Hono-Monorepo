import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(logger());
app.use(cors());
app.get('/', (c) => {
    return c.json({ message: 'Server is running....' }, 200);
});

const port = 3000;
console.log(`Server is running on port http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
