import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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
    // this.authService.user.pipe(take(1)).subscribe(user => {// take(1) I only want to take one value from the observable and then Unsubscribe automatically
    // })

        return this.http.get<Recipe[]>(
          'https://cook-book-learning-angular-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', 
     
        ).pipe( map((recipes) => {
        //-- JS array map() method
        return recipes.map((singleRecipe) => {
          return {
            ...singleRecipe,
            ingredinets: singleRecipe.ingredients
              ? singleRecipe.ingredients
              : [],
          };
        });
      }),
      tap((recipesArray) => {
        this.recipeService.setRecipesToOnesFromFirebase(recipesArray);
      })
    );

    //   .subscribe((recipesFromFirebase) => {
    //     // because later you can sent this to the recipeService
    //     console.log(recipesFromFirebase);
    //     this.recipeService.setRecipesToOnesFromFirebase(recipesFromFirebase);
    //   });
  }
}
