export default function RawResponse({ weather }) {
  return (
    <details className="card raw-card">
      <summary>View raw WeatherAI response</summary>
      <pre>{JSON.stringify(weather, null, 2)}</pre>
    </details>
  );
}
