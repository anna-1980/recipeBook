import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe( 'Tasty Recipe', 'this is a test tasty recipe', 'https://cdn.pixabay.com/photo/2021/01/16/09/05/meal-5921491__340.jpg' ), 
    new Recipe( 'New Tasty Recipe', 'another very fine tasty recipe', 'https://cdn.pixabay.com/photo/2021/01/16/09/05/meal-5921491__340.jpg' ),
    new Recipe( 'Third Tasty Recipe', ' 333 another very fine tasty recipe', 'https://cdn.pixabay.com/photo/2021/01/16/09/05/meal-5921491__340.jpg' )
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

//  recipe is going to be used a lot through out the app 
// therefore it is importnt that is looks the same 
// additional file recipe.model.ts will be created in recipes folder 
// to make a recipe model in it
