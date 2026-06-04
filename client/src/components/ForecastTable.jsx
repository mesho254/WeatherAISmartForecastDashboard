import { formatTemp, pick } from '../utils.js';

export default function ForecastTable({ weather, units }) {
  const data = weather?.data || weather || {};
  const forecast = data.forecast || data.daily || data.days || data.forecast_days || [];
  const rows = Array.isArray(forecast) ? forecast.slice(0, 7) : [];

  return (
    <section className="card">
      <div className="section-title">
        <div>
          <p className="eyebrow">Forecast</p>
          <h2>Daily Breakdown</h2>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="muted">No daily forecast array was returned. The raw API response is still available below.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Condition</th>
                <th>Min</th>
                <th>Max</th>
                <th>Rain</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((day, index) => (
                <tr key={index}>
                  <td>{pick(day, ['date', 'day', 'time'], `Day ${index + 1}`)}</td>
                  <td>{pick(day, ['condition', 'description', 'summary', 'weather.0.description'])}</td>
                  <td>{formatTemp(pick(day, ['min_temp', 'temp_min', 'temperature_min', 'main.temp_min']), units)}</td>
                  <td>{formatTemp(pick(day, ['max_temp', 'temp_max', 'temperature_max', 'main.temp_max']), units)}</td>
                  <td>{pick(day, ['rain_mm', 'precipitation', 'rain', 'pop'], 'N/A')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
