function calculateStats(results) {
  if (!results.length) return null;
  
  const latencies = results.map(r => r.latency);
  const tokens = results.map(r => r.tokens);
  
  return {
    count: results.length,
    latency: {
      min: Math.min(...latencies),
      max: Math.max(...latencies),
      avg: latencies.reduce((a, b) => a + b, 0) / latencies.length,
      p50: percentile(latencies, 50),
      p95: percentile(latencies, 95),
    },
    tokens: {
      min: Math.min(...tokens),
      max: Math.max(...tokens),
      avg: tokens.reduce((a, b) => a + b, 0) / tokens.length,
    },
  };
}

function percentile(arr, p) {
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

module.exports = { calculateStats, percentile };
