import type { Request, Response, NextFunction } from 'express';
import { verifyAdminToken } from '../utils/jwt.js';

export async function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7).trim() : '';
    if (!token) {
        res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Missing or invalid credentials.' } });
        return;
    }
    const ok = await verifyAdminToken(token);
    if (!ok) {
        res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid or expired session.' } });
        return;
    }
    next();
}
