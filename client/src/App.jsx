import { useEffect, useState } from 'react';
import { weatherApi } from './api.js';
import SearchPanel from './components/SearchPanel.jsx';
import WeatherCards from './components/WeatherCards.jsx';
import ForecastTable from './components/ForecastTable.jsx';
import UsageCard from './components/UsageCard.jsx';
import RawResponse from './components/RawResponse.jsx';
import './styles.css';

const initialForm = {
  place: 'Nairobi, KE',
  lat: -1.2921,
  lon: 36.8219,
  days: 7,
  ai: 'true',
  units: 'metric',
  lang: 'en'
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [weather, setWeather] = useState(null);
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadWeather(params = form) {
    setLoading(true);
    setError('');
    try {
      const response = await weatherApi.getWeather(params);
      setWeather(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadUsage() {
    try {
      const response = await weatherApi.getUsage();
      setUsage(response);
    } catch {
      setUsage(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await loadWeather(form);
    await loadUsage();
  }

  function handleGeoDetect() {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async position => {
        const nextForm = {
          ...form,
          lat: Number(position.coords.latitude.toFixed(5)),
          lon: Number(position.coords.longitude.toFixed(5)),
          place: 'Browser detected location'
        };
        setForm(nextForm);
        await loadWeather(nextForm);
        await loadUsage();
      },
      () => {
        setLoading(false);
        setError('Unable to access location. You can still enter coordinates manually.');
      }
    );
  }

  useEffect(() => {
    loadWeather(initialForm);
    loadUsage();
  }, []);

  return (
    <main className="app-shell">
      <SearchPanel
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        onGeoDetect={handleGeoDetect}
        loading={loading}
      />

      {error && <div className="alert">{error}</div>}

      {weather && (
        <>
          <WeatherCards weather={weather} units={form.units} />
          <div className="content-grid">
            <ForecastTable weather={weather} units={form.units} />
            <UsageCard usage={usage} rateLimit={weather.rateLimit} />
          </div>
          <RawResponse weather={weather} />
        </>
      )}
    </main>
  );
}
