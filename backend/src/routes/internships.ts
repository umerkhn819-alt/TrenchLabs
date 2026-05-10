import { Router } from 'express';
import { logTelemetryEvent } from '../config/db.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { publicFormLimiter } from '../middleware/rateLimit.js';
import { AppError } from '../middleware/errorHandler.js';
import { internshipCreateSchema, replyBodySchema, statusUpdateSchema } from '../schemas/forms.js';
import * as internshipService from '../services/internshipService.js';
import { notifyLead } from '../utils/notify.js';

const router = Router();

router.get('/', requireAdminAuth, async (_req, res, next) => {
    try {
        await logTelemetryEvent('internships.list', 'ok');
        res.json(await internshipService.listInternships());
    } catch (e) {
        next(e);
    }
});

router.post('/', publicFormLimiter, async (req, res, next) => {
    try {
        const body = internshipCreateSchema.parse(req.body);
        await logTelemetryEvent('internships.create', 'ok');
        const row = await internshipService.createInternship(body);
        void notifyLead('New internship application', { id: String(row.id), track: body.track });
        res.json(row);
    } catch (e) {
        next(e);
    }
});

router.put('/:id', requireAdminAuth, async (req, res, next) => {
    try {
        const { status } = statusUpdateSchema.parse(req.body);
        const { id } = req.params;
        await logTelemetryEvent('internships.status_update', 'ok');
        const row = await internshipService.updateInternshipStatus(id, status);
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
        await logTelemetryEvent('internships.reply', 'ok');
        const row = await internshipService.replyInternship(id, response_text);
        if (!row) throw new AppError(404, 'Record not found', 'NOT_FOUND');
        res.json(row);
    } catch (e) {
        next(e);
    }
});

export default router;
