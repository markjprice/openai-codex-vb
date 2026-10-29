// Checks what the user types, using the limits in the Information section
// of PRODUCT-BRIEF.md. Each check returns either { ok: true, value } or
// { ok: false, message } with a message that explains what to type instead.

function parseBill(text) {
  const answer = String(text ?? '').trim();
  if (!/^\d+(\.\d{1,2})?$/.test(answer) || Number(answer) <= 0) {
    return {
      ok: false,
      message: 'Please enter the bill total as a number greater than 0, with up to two decimal places, such as 45.50.',
    };
  }
  return { ok: true, value: Number(answer) };
}

function parseWholeNumber(text, min, max, message) {
  const answer = String(text ?? '').trim();
  const number = Number(answer);
  if (!/^\d+$/.test(answer) || number < min || number > max) {
    return { ok: false, message };
  }
  return { ok: true, value: number };
}

function parseTip(text) {
  return parseWholeNumber(text, 0, 100, 'Please enter the tip as a whole number from 0 to 100.');
}

function parsePeople(text) {
  return parseWholeNumber(text, 1, 50, 'Please enter the number of people as a whole number from 1 to 50.');
}

// Keeps asking the same question until the answer passes the check.
// ask(question) returns the user's answer, or null when there's no more input.
// say(message) shows a message to the user.
async function askUntilValid(ask, say, question, parse) {
  for (;;) {
    const answer = await ask(question);
    if (answer === null) return null;
    const result = parse(answer);
    if (result.ok) return result.value;
    say(result.message);
  }
}

module.exports = { parseBill, parseTip, parsePeople, askUntilValid };
