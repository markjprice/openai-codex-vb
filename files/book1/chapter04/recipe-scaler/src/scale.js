// The logic for Recipe Scaler.
// Nothing in this file reads input or prints output, so it can be tested on its own.

// Grams and millilitres are rounded to whole numbers.
// Everything else (eggs, tablespoons) is rounded to one decimal place.
const WHOLE_NUMBER_UNITS = ['g', 'ml'];

function isValidServings(servings) {
  return Number.isInteger(servings) && servings >= 1 && servings <= 100;
}

function roundQuantity(quantity, unit) {
  if (WHOLE_NUMBER_UNITS.includes(unit)) {
    return Math.round(quantity);
  }
  return Math.round(quantity * 10) / 10;
}

// Returns a new recipe for newServings. The original recipe is left unchanged.
function scaleRecipe(recipe, newServings) {
  if (!isValidServings(newServings)) {
    throw new RangeError('Servings must be a whole number from 1 to 100.');
  }

  const factor = newServings / recipe.servings;

  return {
    ...recipe,
    servings: newServings,
    ingredients: recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: roundQuantity(ingredient.quantity * factor, ingredient.unit),
    })),
  };
}

// Turns an ingredient into a line of text, such as "300 g plain flour" or "3 eggs".
function formatIngredient(ingredient) {
  const unit = ingredient.unit ? ` ${ingredient.unit}` : '';
  return `${ingredient.quantity}${unit} ${ingredient.name}`;
}

module.exports = { scaleRecipe, formatIngredient, isValidServings };
