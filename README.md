# Game AI Utilities

CLI tools for testing and debugging game AI pipelines.

## Tools

### `npc-bench` — NPC Response Benchmarking

```bash
node npc-bench.js --npc merchant --iterations 10 --concurrent 3
```

Measures latency, token usage, and response quality across multiple LLM providers.

### `dialogue-replay` — Conversation Replay

```bash
node dialogue-replay.js --file conversation.json
```

Replays a saved conversation for debugging NPC behavior.

### `prompt-lab` — Prompt Testing

```bash
node prompt-lab.js --npc guard --input "What threats are there?"
```

Interactive prompt testing with real-time output.

## Setup

```bash
npm install
cp .env.example .env
```

## License

MIT
