#!/usr/bin/env node

const args = process.argv.slice(2);
const npc = getArg('--npc') || 'merchant';
const iterations = parseInt(getArg('--iterations') || '5', 10);
const concurrent = parseInt(getArg('--concurrent') || '1', 10);

function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
}

async function runBenchmark() {
  console.log(`Benchmarking NPC: ${npc}`);
  console.log(`Iterations: ${iterations}, Concurrency: ${concurrent}`);
  console.log('---');

  const results = [];
  const startTime = Date.now();

  for (let i = 0; i < iterations; i += concurrent) {
    const batch = Math.min(concurrent, iterations - i);
    const promises = Array.from({ length: batch }, () => runSingle(i));
    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
  }

  const totalTime = Date.now() - startTime;
  const avgLatency = results.reduce((s, r) => s + r.latency, 0) / results.length;
  const avgTokens = results.reduce((s, r) => s + r.tokens, 0) / results.length;

  console.log('\n--- Results ---');
  console.log(`Total time: ${totalTime}ms`);
  console.log(`Avg latency: ${Math.round(avgLatency)}ms`);
  console.log(`Avg tokens: ${Math.round(avgTokens)}`);
  console.log(`Requests/sec: ${(iterations / (totalTime / 1000)).toFixed(2)}`);
}

async function runSingle(iteration) {
  const start = Date.now();
  // Simulate API call
  await new Promise(r => setTimeout(r, 100 + Math.random() * 200));
  const latency = Date.now() - start;
  const tokens = Math.floor(50 + Math.random() * 100);
  process.stdout.write('.');
  return { iteration, latency, tokens };
}

runBenchmark().catch(console.error);
