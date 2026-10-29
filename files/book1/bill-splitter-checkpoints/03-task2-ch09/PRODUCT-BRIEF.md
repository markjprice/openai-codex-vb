# Product brief: Bill Splitter

## User and problem

A person paying for a group meal wants to work out what everyone owes,
but splitting the tip and uneven amounts by hand is slow and error-prone.

## Desired outcome

In under a minute, each person knows exactly what they owe, and the
shares add up to the full amount, including the tip.

## Product type

A script that runs in a terminal window.

## Features in the first release

1. Enter the bill total.
2. Enter a tip percentage, which can be zero.
3. Enter the number of people.
4. See each person's share, rounded to two decimal places.

## Not in the first release

- Uneven splits, where people pay different amounts
- Currency symbols or currency conversion
- Saving past bills
- Sending payment requests

## Information

Receives:

- Bill total: a number greater than 0, with up to two decimal places
- Tip percentage: a whole number from 0 to 100
- Number of people: a whole number from 1 to 50

Stores: nothing. Each run starts fresh.

Shares: nothing. The script never connects to the internet.

## Acceptance criteria

1. Given a bill of 60.00, a 10% tip, and 3 people, each share is 22.00
   and the total shown is 66.00.
2. Given a bill of 100.00, a 0% tip, and 3 people, the shares are 33.34,
   33.33, and 33.33, which add up to exactly 100.00.
3. When the user types letters, a negative number, or nothing for the
   bill total, an error message explains the problem and asks again.
4. When the user enters 0 or 51 people, an error message gives the
   allowed range and asks again.
5. Given a 100% tip, the total is double the bill.
