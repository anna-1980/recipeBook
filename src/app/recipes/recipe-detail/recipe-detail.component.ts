import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeDetails: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //retrieaving the ID of the recipe
    //such that you can still choose another recipe while details for another are currently displayed
    // reacting to changes in our recipe ID
    this.route.params.subscribe(
      (params: Params) => {
      this.id = Number(params['id']);
      this.recipeDetails = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    console.log('clicked Add to shopping list');
    this.recipeService.addIngredientsToShoppingList(
      this.recipeDetails.ingredients
    );
  }
}
