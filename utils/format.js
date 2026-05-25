function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

function formatTokens(tokens) {
  if (tokens < 1000) return `${tokens}`;
  return `${(tokens / 1000).toFixed(1)}k`;
}

function printTable(headers, rows) {
  const widths = headers.map((h, i) => 
    Math.max(h.length, ...rows.map(r => String(r[i]).length))
  );
  
  const sep = widths.map(w => '-'.repeat(w + 2)).join('+');
  const header = headers.map((h, i) => ` ${h.padEnd(widths[i])} `).join('|');
  
  console.log(header);
  console.log(sep);
  rows.forEach(row => {
    console.log(row.map((cell, i) => ` ${String(cell).padEnd(widths[i])} `).join('|'));
  });
}

module.exports = { formatDuration, formatTokens, printTable };
