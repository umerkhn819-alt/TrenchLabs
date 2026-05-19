import { ZodError } from 'npm:zod@3.24.4';
import { corsHeaders } from './cors.ts';

export class ApiError extends Error {
    status: number;
    code: string;

    constructor(status: number, message: string, code = 'APP_ERROR') {
        super(message);
        this.status = status;
        this.code = code;
    }
}

export function jsonResponse(payload: unknown, status = 200): Response {
    return new Response(JSON.stringify(payload), {
        status,
        headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
        }
    });
}

export function handleError(err: unknown): Response {
    if (err instanceof ZodError) {
        return jsonResponse(
            {
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid request body',
                    details: err.flatten()
                }
            },
            400
        );
    }
    if (err instanceof ApiError) {
        return jsonResponse(
            {
                error: {
                    code: err.code,
                    message: err.message
                }
            },
            err.status
        );
    }
    if (err instanceof Error) {
        const lower = err.message.toLowerCase();
        if (
            lower.includes('relation') ||
            lower.includes('does not exist') ||
            lower.includes('permission denied') ||
            lower.includes('violates') ||
            lower.includes('invalid input') ||
            lower.includes('column ')
        ) {
            return jsonResponse(
                { error: { code: 'DATABASE_ERROR', message: err.message } },
                400
            );
        }
    }
    console.error(err);
    return jsonResponse(
        { error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } },
        500
    );
}
