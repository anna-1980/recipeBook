import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    //--- Firebase allows this, it will OVERRIDE all the previously stored Recipes------//
    this.http
      .put(
        'https://cook-book-learning-angular-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log('you sent recipes to the Firebase database');
      });
  }

  getRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://cook-book-learning-angular-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe( // this will allow to pass empty array of ingredients if there were not any , so that it is set at least to an empty array
        //--operator
        map((recipes) => {
            //-- JS array map() method
          return recipes.map(singleRecipe => {
            return {...singleRecipe, ingredinets: singleRecipe.ingredients ? singleRecipe.ingredients : []}
          });
        }),
        tap((recipesArray)=>{
            this.recipeService.setRecipesToOnesFromFirebase(recipesArray);
        })
      )
    //   .subscribe((recipesFromFirebase) => {
    //     // because later you can sent this to the recipeService
    //     console.log(recipesFromFirebase);
    //     this.recipeService.setRecipesToOnesFromFirebase(recipesFromFirebase);
    //   });
  }
}
