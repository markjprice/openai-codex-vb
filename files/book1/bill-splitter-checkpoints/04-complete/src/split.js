// The logic for Bill Splitter.
// Works out the total, including the tip, and each person's share.
//
// All amounts are worked out in whole cents, so no cent is lost to rounding.
// When the total doesn't divide evenly, the leftover cents go to the first
// people in the list, one cent each.

function splitBill(bill, tip, people) {
  const billCents = Math.round(bill * 100);
  const totalCents = Math.round((billCents * (100 + tip)) / 100);

  const baseShare = Math.floor(totalCents / people);
  const leftoverCents = totalCents - baseShare * people;

  const sharesCents = [];
  for (let person = 0; person < people; person++) {
    sharesCents.push(person < leftoverCents ? baseShare + 1 : baseShare);
  }

  return { totalCents, sharesCents };
}

// Turns a number of cents into text with two decimal places, such as "33.34".
function formatCents(cents) {
  return (cents / 100).toFixed(2);
}

module.exports = { splitBill, formatCents };
