import { Recipe } from "./recipe.model";

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe( 'Tasty Recipe', 'this is a test tasty recipe  You must try it, go shopping now :)', 'https://cdn.pixabay.com/photo/2021/01/16/09/05/meal-5921491__340.jpg' ), 
        new Recipe( 'New Tasty Recipe', 'another very fine tasty recipe  You must try it, go shopping now :)', 'https://cdn.pixabay.com/photo/2016/03/31/19/30/dish-1295067_960_720.png' ),
        new Recipe( 'Third Tasty Recipe', ' 333 another very fine tasty recipe. You must try it, go shopping now :)', 'https://img.game8.co/3300514/e08f4702cbb16494402c601fbc469e0f.png/show' ),
        new Recipe( 'New Tasty Recipe', 'another very fine tasty recipe  You must try it, go shopping now :)', 'https://cdn.pixabay.com/photo/2016/03/31/19/30/dish-1295067_960_720.png' ),
      ]

    getRecipes() {
        return this.recipes.slice();
    }
}