// Tests for the logic in src/scale.js.
// Run them with: npm test

const test = require('node:test');
const assert = require('node:assert/strict');
const { scaleRecipe, formatIngredient } = require('../src/scale');

const pancakes = {
  id: 'pancakes',
  name: 'Pancakes',
  servings: 4,
  ingredients: [
    { name: 'plain flour', quantity: 200, unit: 'g' },
    { name: 'milk', quantity: 300, unit: 'ml' },
    { name: 'eggs', quantity: 2, unit: '' },
    { name: 'caster sugar', quantity: 1, unit: 'tbsp' },
  ],
};

test('scaling from 4 to 8 servings doubles every quantity', () => {
  const scaled = scaleRecipe(pancakes, 8);
  assert.equal(scaled.servings, 8);
  assert.deepEqual(
    scaled.ingredients.map((ingredient) => ingredient.quantity),
    [400, 600, 4, 2]
  );
});

test('scaling from 4 to 6 servings multiplies every quantity by 1.5', () => {
  const scaled = scaleRecipe(pancakes, 6);
  assert.deepEqual(
    scaled.ingredients.map((ingredient) => ingredient.quantity),
    [300, 450, 3, 1.5]
  );
});

test('grams and millilitres are rounded to whole numbers', () => {
  const scaled = scaleRecipe(pancakes, 3);
  // 200 g x 0.75 = 150 g, 300 ml x 0.75 = 225 ml, 2 eggs x 0.75 = 1.5 eggs
  assert.deepEqual(
    scaled.ingredients.map((ingredient) => ingredient.quantity),
    [150, 225, 1.5, 0.8]
  );
});

test('the original recipe is not changed', () => {
  scaleRecipe(pancakes, 8);
  assert.equal(pancakes.servings, 4);
  assert.equal(pancakes.ingredients[0].quantity, 200);
});

test('zero, negative, and fractional servings are rejected', () => {
  assert.throws(() => scaleRecipe(pancakes, 0), RangeError);
  assert.throws(() => scaleRecipe(pancakes, -2), RangeError);
  assert.throws(() => scaleRecipe(pancakes, 2.5), RangeError);
});

test('an ingredient is shown with its quantity, unit, and name', () => {
  assert.equal(formatIngredient({ name: 'milk', quantity: 450, unit: 'ml' }), '450 ml milk');
  assert.equal(formatIngredient({ name: 'eggs', quantity: 3, unit: '' }), '3 eggs');
});
