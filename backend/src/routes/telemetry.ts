import { Router } from 'express';
import { requireAdminAuth } from '../middleware/auth.js';
import * as telemetryService from '../services/telemetryService.js';

const router = Router();

router.get('/', requireAdminAuth, async (_req, res, next) => {
    try {
        res.json(await telemetryService.listTelemetry());
    } catch (e) {
        next(e);
    }
});

export default router;
