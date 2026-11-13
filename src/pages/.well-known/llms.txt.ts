import type { APIRoute } from 'astro';
import { GET as llmsGet } from '../llms.txt';

/** Alias of /llms.txt for clients that look under /.well-known/ */
export const GET: APIRoute = (ctx) => llmsGet(ctx);
