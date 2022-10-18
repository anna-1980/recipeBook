import { ThisReceiver } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()

export class RecipeService {
  //redundand sfter using Subject
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();

  //to get live update of new recipe added you need to add onChange
  recipeChanged = new Subject<Recipe[]>();

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
      ' So delicious you have to make it. You must try it, go shopping now :)',
      'https://img.game8.co/3300514/e08f4702cbb16494402c601fbc469e0f.png/show',
      [
        new Ingredient('Green Chillies', 0.5, 'kg'),
        new Ingredient('Tomatoes', 1, 'kg'),
        new Ingredient('Rice', 1, 'kg'),
        new Ingredient('Tofu', 400, 'g'),
      ]
    ),
    new Recipe(
      'FourthTasty Recipe',
      'Excellent for parties! You must try it, go shopping now :)',
      'https://cdn.pixabay.com/photo/2016/03/31/19/30/dish-1295067_960_720.png',
      [
        new Ingredient('Sneaky river Snail', 0.5, 'kg'),
        new Ingredient('Hylian Rice', 1, 'kg'),
        new Ingredient('Apple', 2, 'pieces'),

      ]
    ),
  ];

  constructor(private slService: ShoppingListService){}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index]; //returns ID
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addRecipeIngredientsToShoppingList(ingredients);
    console.log("from recipe Service- adding ingredinets to shopping List")
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    // same approach ro refresh (emit even about new recipe) like with the shopping list
   // listen to this event in the recipeList.html 
   // and on change you will recive a new arrray of recipes
    this.recipeChanged.next(this.recipes.slice())
    console.log(`'111 recipe service works' + ${recipe}`)
    console.log(recipe)
    console.log(this.recipes)
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice())
    // console.log('recipe service works 222' )
    // this.recipeSelected.next(this.recipes[index])
    console.log(this.recipes[index].ingredients)
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice())
    console.log(this.recipes)
  }
}

