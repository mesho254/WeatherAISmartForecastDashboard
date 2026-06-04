const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, params = {}) {
  const url = new URL(`${API_URL}/api${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      payload?.details?.upstreamPayload?.error ||
      payload?.details?.upstreamPayload?.message ||
      payload?.message ||
      'Request failed';

    const error = new Error(message);
    error.payload = payload;
    throw error;
  }

  return payload;
}

export const weatherApi = {
  getWeather: params => request('/weather', params),
  getCurrent: params => request('/current', params),
  getDaily: params => request('/daily', params),
  getHourly: params => request('/hourly', params),
  getGeoWeather: params => request('/geo-weather', params),
  getUsage: () => request('/usage')
};