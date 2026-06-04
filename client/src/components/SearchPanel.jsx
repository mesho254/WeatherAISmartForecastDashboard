import { Crosshair, MapPin, Search } from 'lucide-react';
import { presets } from '../utils.js';

export default function SearchPanel({ form, setForm, onSubmit, onGeoDetect, loading }) {
  function handleChange(event) {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function applyPreset(event) {
    const selected = presets.find(item => item.label === event.target.value);
    if (selected) {
      setForm(prev => ({ ...prev, lat: selected.lat, lon: selected.lon, place: selected.label }));
    }
  }

  return (
    <section className="card search-panel">
      <div>
        <p className="eyebrow">WeatherAI Integration</p>
        <h1>Smart Forecast Dashboard</h1>
        <p className="muted">
          View current weather, multi-day forecasts, AI summaries, and API quota usage from one clean interface.
        </p>
      </div>

      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Preset location
          <select onChange={applyPreset} defaultValue="Nairobi, KE">
            {presets.map(item => <option key={item.label}>{item.label}</option>)}
          </select>
        </label>

        <label>
          Latitude
          <input name="lat" type="number" step="any" value={form.lat} onChange={handleChange} required />
        </label>

        <label>
          Longitude
          <input name="lon" type="number" step="any" value={form.lon} onChange={handleChange} required />
        </label>

        <label>
          Forecast days
          <input name="days" type="number" min="1" max="16" value={form.days} onChange={handleChange} />
        </label>

        <label>
          Units
          <select name="units" value={form.units} onChange={handleChange}>
            <option value="metric">Metric °C</option>
            <option value="imperial">Imperial °F</option>
          </select>
        </label>

        <label>
          AI Summary
          <select name="ai" value={form.ai} onChange={handleChange}>
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </label>

        <label>
          Language
          <select name="lang" value={form.lang} onChange={handleChange}>
            <option value="en">English</option>
            <option value="sw">Swahili</option>
          </select>
        </label>

        <div className="actions">
          <button type="submit" disabled={loading}>
            <Search size={18} /> {loading ? 'Loading...' : 'Get Forecast'}
          </button>
          <button type="button" className="secondary" onClick={onGeoDetect} disabled={loading}>
            <Crosshair size={18} /> Auto Detect
          </button>
        </div>
      </form>

      <div className="hint"><MapPin size={16} /> Current selected: {form.place || `${form.lat}, ${form.lon}`}</div>
    </section>
  );
}
