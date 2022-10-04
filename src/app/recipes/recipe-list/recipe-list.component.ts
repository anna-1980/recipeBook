import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

 @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe( 'Tasty Recipe', 'this is a test tasty recipe  You must try it, go shopping now :)', 'https://cdn.pixabay.com/photo/2021/01/16/09/05/meal-5921491__340.jpg' ), 
    new Recipe( 'New Tasty Recipe', 'another very fine tasty recipe  You must try it, go shopping now :)', 'https://cdn.pixabay.com/photo/2016/03/31/19/30/dish-1295067_960_720.png' ),
    new Recipe( 'Third Tasty Recipe', ' 333 another very fine tasty recipe. You must try it, go shopping now :)', 'https://img.game8.co/3300514/e08f4702cbb16494402c601fbc469e0f.png/show' ),
    new Recipe( 'New Tasty Recipe', 'another very fine tasty recipe  You must try it, go shopping now :)', 'https://cdn.pixabay.com/photo/2016/03/31/19/30/dish-1295067_960_720.png' ),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe) //recipe is passed here as data
  }

}

//  recipe is going to be used a lot through out the app 
// therefore it is importnt that is looks the same 
// additional file recipe.model.ts will be created in recipes folder 
// to make a recipe model in it
