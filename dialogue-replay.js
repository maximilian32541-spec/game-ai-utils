#!/usr/bin/env node

const fs = require('fs');

const args = process.argv.slice(2);
const fileIdx = args.indexOf('--file');
const filePath = fileIdx !== -1 ? args[fileIdx + 1] : null;

if (!filePath) {
  console.error('Usage: dialogue-replay --file <conversation.json>');
  process.exit(1);
}

async function replay() {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const messages = data.messages || data;

  console.log(`Replaying conversation (${messages.length} messages)\n`);

  for (const msg of messages) {
    const prefix = msg.role === 'user' ? 'Player' : msg.npc || 'NPC';
    const emotion = msg.emotion ? ` [${msg.emotion}]` : '';
    console.log(`${prefix}${emotion}: ${msg.content}`);
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n--- Replay complete ---');
}

replay().catch(console.error);
