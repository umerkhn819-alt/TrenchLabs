import { z } from 'zod';

export const loginBodySchema = z.object({
    password: z.string().min(1)
});

export const contactCreateSchema = z.object({
    name: z.string().min(1).max(200),
    email: z.string().email().max(320),
    message: z.string().min(1).max(10_000)
});

export const contactReplySchema = z.object({
    response_text: z.string().min(1).max(10_000)
});

export const careersCreateSchema = z.object({
    name: z.string().min(1).max(200),
    email: z.string().email().max(320),
    github: z.string().max(2000).optional(),
    compensation: z.string().max(200).optional(),
    experience: z.string().max(10_000).optional(),
    role: z.string().min(1).max(200)
});

export const statusUpdateSchema = z.object({
    status: z.string().min(1).max(100)
});

export const replyBodySchema = z.object({
    response_text: z.string().min(1).max(10_000)
});

export const internshipCreateSchema = z.object({
    name: z.string().min(1).max(200),
    email: z.string().email().max(320),
    university: z.string().max(300).optional(),
    github: z.string().max(2000).optional(),
    statement: z.string().min(1).max(10_000),
    track: z.string().min(1).max(200)
});

export const bookingCreateSchema = z.object({
    date: z.string().min(1).max(100),
    time: z.string().min(1).max(100),
    company: z.string().min(1).max(200),
    contact: z.string().min(1).max(200),
    email: z.string().email().max(320)
});
