/**
 * Optional outbound notifications for new leads. Set SLACK_WEBHOOK_URL in production.
 */
export async function notifyLead(event: string, meta: Record<string, string>): Promise<void> {
    const url = process.env.SLACK_WEBHOOK_URL?.trim();
    if (!url) return;

    const text = `[TrenchLabs] ${event}\n${Object.entries(meta)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')}`;

    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
    } catch {
        // Non-fatal: form submission already succeeded
    }
}
