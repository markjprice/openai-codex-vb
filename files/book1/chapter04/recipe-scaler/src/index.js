// The user interface for Recipe Scaler.
// It asks which recipe to scale and for how many servings, then prints the result.

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const pc = require('picocolors');
const { scaleRecipe, formatIngredient, isValidServings } = require('./scale');

const RECIPES_FILE = path.join(__dirname, '..', 'data', 'recipes.json');

function loadRecipes() {
  const recipes = JSON.parse(fs.readFileSync(RECIPES_FILE, 'utf8'));
  console.log(`Loaded ${recipes.length} recipes from data/recipes.json.`);
  return recipes;
}

// Finds a recipe by its number in the list (1, 2, 3) or by its id or name.
function findRecipe(recipes, text) {
  const answer = String(text).trim().toLowerCase();
  if (/^\d+$/.test(answer)) {
    return recipes[Number(answer) - 1];
  }
  return recipes.find(
    (recipe) => recipe.id === answer || recipe.name.toLowerCase() === answer
  );
}

function printRecipe(recipe) {
  console.log('');
  console.log(pc.bold(`${recipe.name} (serves ${recipe.servings})`));
  for (const ingredient of recipe.ingredients) {
    console.log(`  - ${formatIngredient(ingredient)}`);
  }
  console.log('');
}

// Asks a question and waits for one line of input.
function createPrompter() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const lines = rl[Symbol.asyncIterator]();
  return {
    async ask(question) {
      rl.setPrompt(question);
      rl.prompt();
      const { value, done } = await lines.next();
      return done ? null : value;
    },
    close() {
      rl.close();
    },
  };
}

async function main() {
  console.log(pc.bold('Recipe Scaler'));
  const recipes = loadRecipes();
  const [recipeArg, servingsArg] = process.argv.slice(2);

  // Quick mode: npm start -- pancakes 6
  if (recipeArg && servingsArg) {
    const recipe = findRecipe(recipes, recipeArg);
    const servings = Number(servingsArg);
    if (!recipe) {
      console.log(`No recipe called "${recipeArg}". Try a number from 1 to ${recipes.length}.`);
      process.exitCode = 1;
      return;
    }
    if (!isValidServings(servings)) {
      console.log('Servings must be a whole number from 1 to 100.');
      process.exitCode = 1;
      return;
    }
    console.log(`Scaling ${recipe.name} from ${recipe.servings} to ${servings} servings.`);
    printRecipe(scaleRecipe(recipe, servings));
    return;
  }

  // Question mode: npm start
  console.log('');
  recipes.forEach((recipe, index) => {
    console.log(`  ${index + 1}) ${recipe.name} (serves ${recipe.servings})`);
  });
  console.log('');

  const prompter = createPrompter();
  try {
    let recipe;
    while (!recipe) {
      const answer = await prompter.ask(`Which recipe? (1 to ${recipes.length}): `);
      if (answer === null) return;
      recipe = findRecipe(recipes, answer);
      if (!recipe) console.log(`Please enter a number from 1 to ${recipes.length}.`);
    }

    let servings;
    while (servings === undefined) {
      const answer = await prompter.ask('How many servings? (1 to 100): ');
      if (answer === null) return;
      const number = Number(answer.trim());
      if (answer.trim() !== '' && isValidServings(number)) {
        servings = number;
      } else {
        console.log('Please enter a whole number from 1 to 100.');
      }
    }

    console.log(`Scaling ${recipe.name} from ${recipe.servings} to ${servings} servings.`);
    printRecipe(scaleRecipe(recipe, servings));
  } finally {
    prompter.close();
  }
}

main();
