import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config, validateConfig } from './config.js';
import { router } from './routes.js';
import { WeatherAiError } from './weatherAiClient.js';

validateConfig();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true
  })
);

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', router);

app.use((_req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

app.use((error, _req, res, _next) => {
  console.error('API ERROR:', {
    message: error.message,
    statusCode: error.statusCode,
    details: error.details
  });

  if (error.name === 'ZodError') {
    return res.status(400).json({
      message: 'Invalid request parameters',
      issues: error.issues
    });
  }

  if (error instanceof WeatherAiError) {
    return res.status(error.statusCode || 502).json({
      message: error.message,
      source: 'WeatherAI',
      details: error.details
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
    details:
      config.nodeEnv === 'development'
        ? { error: error.message }
        : undefined
  });
});

// Start server in non-serverless environments
if (process.env.VERCEL !== '1') {
  app.listen(config.port, () => {
    console.log(`WeatherAI backend running on http://localhost:${config.port}`);
  });
}

export default app;
