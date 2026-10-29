// The logic for Bill Splitter.
// Works out the total, including the tip, and each person's share.

function splitBill(bill, tip, people) {
  const total = bill + (bill * tip) / 100;
  const share = total / people;
  return { total, share };
}

module.exports = { splitBill };
