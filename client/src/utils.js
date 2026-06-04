export function pick(obj, paths, fallback = 'N/A') {
  for (const path of paths) {
    const value = path.split('.').reduce((acc, key) => acc?.[key], obj);
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return fallback;
}

export function formatTemp(value, units = 'metric') {
  if (value === 'N/A' || value === undefined || value === null) return 'N/A';
  return `${Math.round(Number(value))}°${units === 'imperial' ? 'F' : 'C'}`;
}

export const presets = [
  { label: 'Nairobi, KE', lat: -1.2921, lon: 36.8219 },
  { label: 'Bomet, KE', lat: -0.7813, lon: 35.3416 },
  { label: 'Mombasa, KE', lat: -4.0435, lon: 39.6682 },
  { label: 'London, UK', lat: 51.5072, lon: -0.1276 },
  { label: 'New York, US', lat: 40.7128, lon: -74.006 }
];
