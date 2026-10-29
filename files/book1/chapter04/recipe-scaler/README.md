# Recipe Scaler

Recipe Scaler is a small command-line tool that changes a recipe's ingredient
quantities for a different number of servings. For example, it turns a
pancake recipe for 4 people into one for 6.

## What you need

- Node.js (the LTS version)

## Install the packages

```
npm install
```

## Run the tool

Run it and answer the questions:

```
npm start
```

Or give the recipe and the new number of servings in one go:

```
npm start -- pancakes 6
```

## Run the tests

```
npm test
```

## How the project is organized

| File or folder | What it's for |
| --- | --- |
| `src/index.js` | The user interface: asks questions and prints the scaled recipe |
| `src/scale.js` | The logic: works out the new quantities |
| `data/recipes.json` | The data: the recipes the tool knows about |
| `tests/scale.test.js` | Tests that check the logic in `src/scale.js` |
| `package.json` | The project's name, its packages, and the `start` and `test` commands |
| `package-lock.json` | The exact package versions installed |
| `.gitignore` | Tells Git not to save `node_modules` |
| `node_modules/` | Packages downloaded by `npm install` (created when you install) |

## Packages

This project uses one package, [picocolors](https://www.npmjs.com/package/picocolors),
to show recipe names in bold in the terminal.
