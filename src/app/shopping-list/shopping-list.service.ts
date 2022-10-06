import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  //you have to inform the new component taht new data is available !
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingriedients: Ingredient[] =
    // [new Ingredient('Apples', 5, 'pieces'),
    // new Ingredient('Carrots', 2, 'pieces'),
    // new Ingredient('Tofu', 1, 'kg'),]
    JSON.parse(localStorage.getItem('ingredients')) || [];

  ingredientsLocal: Ingredient[] = JSON.parse(
    localStorage.getItem('ingredients')
  );

  getIngredients() {
    return this.ingriedients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingriedients.push(ingredient);
    this.ingredientsChanged.emit(this.ingriedients.slice());
    //-----------------My LocalStorage piece----------------------------------------//
    if (this.ingredientsLocal === null) {
      // console.log('1' + this.ingredientsLocal);
      this.ingredientsLocal = [];
    } else {
      this.ingredientsLocal = JSON.parse(localStorage.getItem('ingredients'));
      // console.log('2' + this.ingredientsLocal);
    }
    // this.ingriedients.push(ingredient); <---this was causing doubble render
    // console.log("log ingredients" + this.ingriedients);
    this.ingredientsLocal.push({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    });
    localStorage.setItem('ingredients', JSON.stringify(this.ingredientsLocal));
    // console.log('last log of ingredientsLocal');
    // console.log(this.ingredientsLocal);
    //-----------------My LocalStorage piece--------------------------------------------//
  }

  // his name : addIngredients
  addRecipeIngredientsToShoppingList(ingredients: Ingredient[]) {
    // method one, but it ends up emitting lots of events might be bad for bigger app
    // for (let ingredient of ingredients){
    //   this.addIngredient(ingredient);
    // }

    this.ingriedients.push(...ingredients);

    if (this.ingredientsLocal === null) {
      this.ingredientsLocal = [];
    } else {
      this.ingredientsLocal = JSON.parse(localStorage.getItem('ingredients'));
    }
    this.ingredientsLocal.push(...ingredients);
    localStorage.setItem('ingredients', JSON.stringify(this.ingredientsLocal));
    console.log('pushing ingredients' + this.ingredientsLocal);

    this.ingredientsChanged.emit(this.ingriedients.slice());
    console.log('Changed ingredient list after pushing ingredients');
  }
}
