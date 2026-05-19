import * as jose from 'npm:jose@6.0.11';
import { ApiError } from './errors.ts';

const ADMIN_SUB = 'trenchlabs-admin';

export function getJwtSecret(): string {
    const secret = Deno.env.get('ADMIN_JWT_SECRET')?.trim() || '';
    if (secret.length < 32) {
        throw new ApiError(503, 'Admin authentication is not configured.', 'AUTH_NOT_CONFIGURED');
    }
    return secret;
}

export function getAdminPassword(): string {
    const password = Deno.env.get('ADMIN_PASSWORD')?.trim() || '';
    if (!password) {
        throw new ApiError(503, 'Admin authentication is not configured.', 'AUTH_NOT_CONFIGURED');
    }
    return password;
}

export async function signAdminToken(): Promise<string> {
    const secret = new TextEncoder().encode(getJwtSecret());
    return new jose.SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setSubject(ADMIN_SUB)
        .setIssuedAt()
        .setExpirationTime('8h')
        .sign(secret);
}

export async function verifyAdminToken(token: string): Promise<boolean> {
    try {
        const secret = new TextEncoder().encode(getJwtSecret());
        const { payload } = await jose.jwtVerify(token, secret);
        return payload.sub === ADMIN_SUB && payload.role === 'admin';
    } catch {
        return false;
    }
}

export async function requireAdminAuth(req: Request): Promise<void> {
    const header = req.headers.get('authorization') || '';
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
    if (!token) {
        throw new ApiError(401, 'Missing or invalid credentials.', 'UNAUTHORIZED');
    }
    const ok = await verifyAdminToken(token);
    if (!ok) {
        throw new ApiError(401, 'Invalid or expired session.', 'UNAUTHORIZED');
    }
}
