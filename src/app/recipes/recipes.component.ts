import { Component, OnInit } from '@angular/core';
// import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'], 
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  // selectedRecipe: Recipe;

  // constructor(private  recipeService: RecipeService) { }

  ngOnInit(): void {
  
  }

}


//--------was before routing was added -----------//
// ngOnInit(): void {
//   // comming from RecipeService
//   this.recipeService.recipeSelected
//     .subscribe(
//       //because of the way we configured the EventEmitter in recipeService
//       (recipe: Recipe) => {
//         this.selectedRecipe = recipe
//       }
//     )
// }

