export default function UsageCard({ usage, rateLimit }) {
  const data = usage?.data || usage || {};

  return (
    <section className="card usage-card">
      <p className="eyebrow">API Health</p>
      <h2>Usage & Quota</h2>
      <div className="usage-grid">
        <div><span>Plan</span><strong>{data.plan || data.subscription?.plan || 'N/A'}</strong></div>
        <div><span>Used</span><strong>{data.used || data.requests_used || data.request_count || 'N/A'}</strong></div>
        <div><span>Limit</span><strong>{data.limit || data.requests_limit || rateLimit?.limit || 'N/A'}</strong></div>
        <div><span>Remaining</span><strong>{data.remaining || rateLimit?.remaining || 'N/A'}</strong></div>
      </div>
    </section>
  );
}
