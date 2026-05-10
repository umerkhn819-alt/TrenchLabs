import { Router } from 'express';
import { logTelemetryEvent } from '../config/db.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { publicFormLimiter } from '../middleware/rateLimit.js';
import { AppError } from '../middleware/errorHandler.js';
import { bookingCreateSchema, statusUpdateSchema } from '../schemas/forms.js';
import * as bookingService from '../services/bookingService.js';
import { notifyLead } from '../utils/notify.js';

const router = Router();

router.get('/', requireAdminAuth, async (_req, res, next) => {
    try {
        await logTelemetryEvent('bookings.list', 'ok');
        res.json(await bookingService.listBookings());
    } catch (e) {
        next(e);
    }
});

router.post('/', publicFormLimiter, async (req, res, next) => {
    try {
        const body = bookingCreateSchema.parse(req.body);
        await logTelemetryEvent('bookings.create', 'ok');
        const row = await bookingService.createBooking(body);
        void notifyLead('New consultation booking', { id: String(row.id), company: body.company });
        res.json(row);
    } catch (e) {
        next(e);
    }
});

router.put('/:id', requireAdminAuth, async (req, res, next) => {
    try {
        const { status } = statusUpdateSchema.parse(req.body);
        const { id } = req.params;
        await logTelemetryEvent('bookings.status_update', 'ok');
        const row = await bookingService.updateBookingStatus(id, status);
        if (!row) throw new AppError(404, 'Record not found', 'NOT_FOUND');
        res.json(row);
    } catch (e) {
        next(e);
    }
});

export default router;
