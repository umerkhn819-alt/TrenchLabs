import { Router } from 'express';
import { logTelemetryEvent } from '../config/db.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { publicFormLimiter } from '../middleware/rateLimit.js';
import { AppError } from '../middleware/errorHandler.js';
import { careersCreateSchema, replyBodySchema, statusUpdateSchema } from '../schemas/forms.js';
import * as careersService from '../services/careersService.js';
import { notifyLead } from '../utils/notify.js';

const router = Router();

router.get('/', requireAdminAuth, async (_req, res, next) => {
    try {
        await logTelemetryEvent('careers.list', 'ok');
        res.json(await careersService.listCareers());
    } catch (e) {
        next(e);
    }
});

router.post('/', publicFormLimiter, async (req, res, next) => {
    try {
        const body = careersCreateSchema.parse(req.body);
        await logTelemetryEvent('careers.create', 'ok');
        const row = await careersService.createCareers(body);
        void notifyLead('New careers application', { id: String(row.id), role: body.role });
        res.json(row);
    } catch (e) {
        next(e);
    }
});

router.put('/:id', requireAdminAuth, async (req, res, next) => {
    try {
        const { status } = statusUpdateSchema.parse(req.body);
        const { id } = req.params;
        await logTelemetryEvent('careers.status_update', 'ok');
        const row = await careersService.updateCareersStatus(id, status);
        if (!row) throw new AppError(404, 'Record not found', 'NOT_FOUND');
        res.json(row);
    } catch (e) {
        next(e);
    }
});

router.post('/:id/reply', requireAdminAuth, async (req, res, next) => {
    try {
        const { response_text } = replyBodySchema.parse(req.body);
        const { id } = req.params;
        await logTelemetryEvent('careers.reply', 'ok');
        const row = await careersService.replyCareers(id, response_text);
        if (!row) throw new AppError(404, 'Record not found', 'NOT_FOUND');
        res.json(row);
    } catch (e) {
        next(e);
    }
});

export default router;
