import express from 'express';
import NodeCache from 'node-cache';
import { config } from './config.js';
import { callWeatherAi } from './weatherAiClient.js';
import { weatherGeoQuerySchema, weatherQuerySchema } from './validators.js';

export const router = express.Router();
const cache = new NodeCache({ stdTTL: config.cacheTtlSeconds });

function buildCacheKey(path, query) {
  return `${path}:${JSON.stringify(Object.keys(query).sort().reduce((acc, key) => ({ ...acc, [key]: query[key] }), {}))}`;
}

async function cachedWeatherAiCall(path, query) {
  const key = buildCacheKey(path, query);
  const cached = cache.get(key);

  if (cached) {
    return { ...cached, cached: true };
  }

  const result = await callWeatherAi(path, query);
  cache.set(key, result);
  return { ...result, cached: false };
}

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'weather-ai-server', timestamp: new Date().toISOString() });
});

router.get('/weather', async (req, res, next) => {
  try {
    const query = weatherQuerySchema.parse(req.query);
    const result = await cachedWeatherAiCall('/v1/weather', query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/current', async (req, res, next) => {
  try {
    const query = weatherQuerySchema.parse(req.query);
    const result = await cachedWeatherAiCall('/v1/current', query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/daily', async (req, res, next) => {
  try {
    const query = weatherQuerySchema.parse(req.query);
    const result = await cachedWeatherAiCall('/v1/daily', query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/hourly', async (req, res, next) => {
  try {
    const query = weatherQuerySchema.parse(req.query);
    const result = await cachedWeatherAiCall('/v1/hourly', query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/geo-weather', async (req, res, next) => {
  try {
    const query = weatherGeoQuerySchema.parse(req.query);
    const result = await cachedWeatherAiCall('/v1/weather-geo', query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/usage', async (_req, res, next) => {
  try {
    const result = await callWeatherAi('/v1/usage');
    res.json(result);
  } catch (error) {
    next(error);
  }
});
