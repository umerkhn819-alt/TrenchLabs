const DEFAULT_DEV_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:5175',
    'http://127.0.0.1:3000'
];

export function getCorsOrigins(): string[] {
    const raw = process.env.FRONTEND_ORIGIN?.trim();
    if (!raw) return DEFAULT_DEV_ORIGINS;
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

export function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET?.trim();
    if (secret && secret.length >= 32) return secret;
    if (process.env.NODE_ENV === 'production') {
        throw new Error('JWT_SECRET must be set to a random string of at least 32 characters in production.');
    }
    console.warn(
        '[trenchlabs-api] JWT_SECRET missing or short; using insecure dev default. Set JWT_SECRET in .env for real deployments.'
    );
    return 'dev-only-trenchlabs-jwt-secret-min-32-chars!!';
}

export function getAdminPassword(): string | null {
    const p = process.env.ADMIN_PASSWORD?.trim();
    return p && p.length > 0 ? p : null;
}

export function assertAuthConfigured(): void {
    if (process.env.NODE_ENV !== 'production') return;
    if (!getAdminPassword()) {
        throw new Error('ADMIN_PASSWORD must be set in production.');
    }
}
