import * as jose from 'jose';
import { getJwtSecret } from '../config/env.js';

const ADMIN_SUB = 'trenchlabs-admin';

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
