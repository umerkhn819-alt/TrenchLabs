import { Router } from 'express';
import { logTelemetryEvent } from '../config/db.js';
import { getAdminPassword } from '../config/env.js';
import { authLoginLimiter } from '../middleware/rateLimit.js';
import { loginBodySchema } from '../schemas/forms.js';
import { signAdminToken } from '../utils/jwt.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

router.post('/login', authLoginLimiter, async (req, res, next) => {
    try {
        const password = loginBodySchema.parse(req.body).password;
        const expected = getAdminPassword();
        if (!expected) {
            throw new AppError(503, 'Admin authentication is not configured.', 'AUTH_NOT_CONFIGURED');
        }
        if (password !== expected) {
            await logTelemetryEvent('auth.login.failure', 'unauthorized');
            throw new AppError(401, 'Invalid authorization credentials.', 'INVALID_CREDENTIALS');
        }
        const token = await signAdminToken();
        await logTelemetryEvent('auth.login.success', 'ok');
        res.json({ token });
    } catch (e) {
        next(e);
    }
});

export default router;
