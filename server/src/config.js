import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  weatherAiBaseUrl: process.env.WEATHER_AI_BASE_URL || 'https://api.weather-ai.co',
  weatherAiApiKey: process.env.WEATHER_AI_API_KEY,
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS || 300)
};

export function validateConfig() {
  if (!config.weatherAiApiKey) {
    throw new Error('Missing WEATHER_AI_API_KEY. Add it to server/.env');
  }
}
