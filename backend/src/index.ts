import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { connectDatabase, isRealSupabaseConnected, verifySupabaseSchema } from './config/db.js';
import { assertAuthConfigured, getCorsOrigins } from './config/env.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

assertAuthConfigured();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
    cors({
        origin: getCorsOrigins(),
        credentials: true
    })
);
app.use(express.json({ limit: '256kb' }));

connectDatabase();
void verifySupabaseSchema();

app.use('/api', apiRouter);

app.get('/health', (_req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: isRealSupabaseConnected ? 'supabase' : 'sandbox'
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`TrenchLabs API listening on port ${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log(`API base: http://localhost:${PORT}/api`);
});
