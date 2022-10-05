import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Recipe Apples',
      'this is a test tasty recipe  You must try it, go shopping now :)',
      'https://cdn.pixabay.com/photo/2021/01/16/09/05/meal-5921491__340.jpg',
      [
        new Ingredient('Apple', 1, 'kg'),
        new Ingredient('Honey', 2, 'jar'),
        new Ingredient('Wallnuts', 200, 'grams'),
      ]
    ),
    new Recipe(
      'New Tomatoe Tasty Recipe',
      'another very fine tasty recipe  You must try it, go shopping now :)',
      'https://cdn.pixabay.com/photo/2016/03/31/19/30/dish-1295067_960_720.png',
      [
        new Ingredient('Tomatoes', 2, 'kg'),
        new Ingredient('Cream', 200, 'ml'),
        new Ingredient('Pasta', 1, 'pack'),
      ]
    ),
    new Recipe(
      'Third Chili Tasty Recipe',
      ' 333 another very fine tasty recipe. You must try it, go shopping now :)',
      'https://img.game8.co/3300514/e08f4702cbb16494402c601fbc469e0f.png/show',
      [
        new Ingredient('Green CHillies', 0.5, 'kg'),
        new Ingredient('Tomatoes', 1, 'kg'),
        new Ingredient('Rice', 1, 'kg'),
        new Ingredient('Tofu', 400, 'g'),
      ]
    ),
    new Recipe(
      'FourthTasty Recipe',
      'another very fine tasty recipe  You must try it, go shopping now :)',
      'https://cdn.pixabay.com/photo/2016/03/31/19/30/dish-1295067_960_720.png',
      [
        new Ingredient('Sneaky river Snail', 0.5, 'kg'),
        new Ingredient('Hylian Rice', 1, 'kg'),
        new Ingredient('Apple', 2, 'pieces'),

      ]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
