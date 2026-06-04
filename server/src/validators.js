import { z } from 'zod';

const booleanString = z.enum(['true', 'false']).optional();

export const weatherQuerySchema = z
  .object({
    lat: z.coerce.number().min(-90).max(90),
    lon: z.coerce.number().min(-180).max(180),
    days: z.coerce.number().int().min(1).max(7).default(7),
    ai: booleanString.default('true'),
    units: z.enum(['metric', 'imperial']).default('metric'),
    lang: z.string().min(2).max(5).default('en')
  })
  .strip();

export const weatherGeoQuerySchema = z
  .object({
    ip: z.string().default('auto'),
    lat: z.coerce.number().min(-90).max(90).optional(),
    lon: z.coerce.number().min(-180).max(180).optional(),
    days: z.coerce.number().int().min(1).max(7).default(7),
    ai: booleanString.default('true'),
    units: z.enum(['metric', 'imperial']).default('metric'),
    lang: z.string().min(2).max(5).default('en')
  })
  .strip();