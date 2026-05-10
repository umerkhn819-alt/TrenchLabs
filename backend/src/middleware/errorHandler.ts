import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
    constructor(
        public status: number,
        message: string,
        public code = 'APP_ERROR'
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid request body',
                details: err.flatten()
            }
        });
    }
    if (err instanceof AppError) {
        return res.status(err.status).json({
            error: {
                code: err.code,
                message: err.message
            }
        });
    }
    // Supabase PostgrestError and similar extend Error with DB hints
    if (err instanceof Error) {
        const msg = err.message;
        const lower = msg.toLowerCase();
        if (
            lower.includes('relation') ||
            lower.includes('does not exist') ||
            lower.includes('permission denied') ||
            lower.includes('violates') ||
            lower.includes('invalid input') ||
            lower.includes('column ')
        ) {
            return res.status(400).json({
                error: {
                    code: 'DATABASE_ERROR',
                    message: msg
                }
            });
        }
    }
    console.error(err);
    return res.status(500).json({
        error: {
            code: 'INTERNAL_ERROR',
            message: 'An unexpected error occurred'
        }
    });
}
