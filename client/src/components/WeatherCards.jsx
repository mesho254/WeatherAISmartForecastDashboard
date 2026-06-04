import { CloudSun, Droplets, Gauge, Thermometer, Wind } from 'lucide-react';
import { formatTemp, pick } from '../utils.js';

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <span>{icon}</span>
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

export default function WeatherCards({ weather, units }) {
  const data = weather?.data || weather || {};
  const current = data.current || data.weather?.current || data.conditions || data;
  const summary = pick(data, ['ai_summary', 'summary', 'insights.summary', 'analysis.summary'], 'No AI summary returned for this request.');

  const temperature = pick(current, ['temperature', 'temp', 'temperature_c', 'temp_c', 'main.temp']);
  const condition = pick(current, ['condition', 'description', 'weather.0.description', 'summary'], 'Current conditions');
  const humidity = pick(current, ['humidity', 'main.humidity']);
  const wind = pick(current, ['wind_speed', 'wind.speed', 'windSpeed']);
  const pressure = pick(current, ['pressure', 'main.pressure']);

  return (
    <section className="weather-grid">
      <div className="card current-card">
        <div className="current-heading">
          <CloudSun size={42} />
          <div>
            <p className="eyebrow">Current Conditions</p>
            <h2>{formatTemp(temperature, units)}</h2>
            <p className="muted">{condition}</p>
          </div>
        </div>
        <div className="summary-box">{summary}</div>
      </div>

      <div className="stats-grid">
        <StatCard icon={<Thermometer />} label="Temperature" value={formatTemp(temperature, units)} />
        <StatCard icon={<Droplets />} label="Humidity" value={humidity === 'N/A' ? 'N/A' : `${humidity}%`} />
        <StatCard icon={<Wind />} label="Wind" value={wind === 'N/A' ? 'N/A' : `${wind} ${units === 'imperial' ? 'mph' : 'km/h'}`} />
        <StatCard icon={<Gauge />} label="Pressure" value={pressure === 'N/A' ? 'N/A' : `${pressure} hPa`} />
      </div>
    </section>
  );
}
