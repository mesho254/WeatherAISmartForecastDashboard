import { config } from './config.js';

export class WeatherAiError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = 'WeatherAiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function buildWeatherAiUrl(path, query = {}) {
  const url = new URL(`${config.weatherAiBaseUrl}${path}`);

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

async function makeRequest(path, query = {}) {
  const url = buildWeatherAiUrl(path, query);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${config.weatherAiApiKey}`,
      Accept: 'application/json'
    }
  });

  const rateLimit = {
    limit: response.headers.get('x-ratelimit-limit'),
    remaining: response.headers.get('x-ratelimit-remaining'),
    reset: response.headers.get('x-ratelimit-reset')
  };

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = {
      error: 'WeatherAI returned a non-JSON response'
    };
  }

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    payload,
    rateLimit,
    upstreamUrl: url.toString().replace(config.weatherAiApiKey || '', 'hidden')
  };
}

export async function callWeatherAi(path, query = {}) {
  let result = await makeRequest(path, query);

  /**
   * WeatherAI docs say 500 is server-side.
   * Retry once before failing.
   */
  if (!result.ok && result.status >= 500) {
    await sleep(800);
    result = await makeRequest(path, query);
  }

  /**
   * If Gemini AI summary fails, fallback to normal weather data.
   * This keeps the app working instead of completely failing.
   */
  if (!result.ok && result.status >= 500 && String(query.ai) === 'true') {
    const fallbackQuery = {
      ...query,
      ai: 'false'
    };

    const fallbackResult = await makeRequest(path, fallbackQuery);

    if (fallbackResult.ok) {
      return {
        data: fallbackResult.payload,
        rateLimit: fallbackResult.rateLimit,
        fallback: true,
        fallbackReason: 'WeatherAI returned 500 when ai=true, so the request was retried with ai=false.'
      };
    }
  }

  if (!result.ok) {
    const message =
      result.payload?.message ||
      result.payload?.error ||
      `WeatherAI request failed with status ${result.status}`;

    throw new WeatherAiError(message, result.status, {
      upstreamStatus: result.status,
      upstreamStatusText: result.statusText,
      upstreamPayload: result.payload,
      rateLimit: result.rateLimit,
      upstreamUrl: result.upstreamUrl
    });
  }

  return {
    data: result.payload,
    rateLimit: result.rateLimit,
    fallback: false
  };
}