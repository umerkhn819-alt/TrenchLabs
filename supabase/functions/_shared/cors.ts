export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS'
};

export function optionsResponse(): Response {
    return new Response('ok', { headers: corsHeaders });
}
