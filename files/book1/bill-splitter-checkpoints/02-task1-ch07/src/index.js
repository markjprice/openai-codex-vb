// The user interface for Bill Splitter.
// Asks for the bill, tip, and number of people, then shows each share.

const readline = require('node:readline');
const { splitBill } = require('./split');

// Asks a question and waits for one line of input.
function createPrompter() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const lines = rl[Symbol.asyncIterator]();
  return {
    async ask(question) {
      rl.setPrompt(question);
      rl.prompt();
      const { value, done } = await lines.next();
      return done ? '' : value;
    },
    close() {
      rl.close();
    },
  };
}

async function main() {
  console.log('Bill Splitter');
  console.log('');

  const prompter = createPrompter();
  const bill = Number(await prompter.ask('Bill total: '));
  const tip = Number(await prompter.ask('Tip percentage: '));
  const people = Number(await prompter.ask('Number of people: '));
  prompter.close();

  const { total, share } = splitBill(bill, tip, people);

  console.log('');
  console.log('Total to pay: ' + total.toFixed(2));
  console.log('Each person pays ' + share.toFixed(2));
}

main();
