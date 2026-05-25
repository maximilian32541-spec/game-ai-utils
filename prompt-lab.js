#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const SYSTEM_PROMPTS = {
  merchant: 'You are Goron, a friendly dwarven merchant. Respond in character.',
  guard: 'You are Captain Elara, a stern city guard. Be direct and professional.',
  mage: 'You are Theron, an ancient wizard. Speak with wisdom and mystery.',
};

const npc = process.argv.find(a => a.startsWith('--npc='))?.split('=')[1] || 'merchant';
const systemPrompt = SYSTEM_PROMPTS[npc] || SYSTEM_PROMPTS.merchant;

console.log(`Prompt Lab — NPC: ${npc}`);
console.log('Type a message to test the NPC prompt. Type "quit" to exit.\n');

function ask() {
  rl.question('Player: ', async (input) => {
    if (input.toLowerCase() === 'quit') {
      rl.close();
      return;
    }
    console.log(`\n[System prompt]: ${systemPrompt}`);
    console.log(`[Player input]: ${input}`);
    console.log('[Expected]: In-character response based on NPC personality]\n');
    ask();
  });
}

ask();
