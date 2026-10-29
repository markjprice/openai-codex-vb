// The user interface for Bill Splitter.
// Asks for the bill, tip, and number of people, then shows each share.

const readline = require('node:readline');
const { splitBill, formatCents } = require('./split');

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

  const { totalCents, sharesCents } = splitBill(bill, tip, people);

  console.log('');
  console.log('Total to pay: ' + formatCents(totalCents));

  const everyoneSame = sharesCents.every((share) => share === sharesCents[0]);
  if (everyoneSame) {
    console.log('Each person pays ' + formatCents(sharesCents[0]));
  } else {
    sharesCents.forEach((share, index) => {
      console.log('Person ' + (index + 1) + ' pays ' + formatCents(share));
    });
  }
}

main();
