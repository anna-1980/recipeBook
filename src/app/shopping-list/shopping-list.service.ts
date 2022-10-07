// import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  //you have to inform the new component that new data is available ! below: (obsolete with observables introduced)
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>(); //instead of emit call next instead
 //the parts where we "consume" Ingredients do not have to change syntax

  private ingriedients: Ingredient[] =
    JSON.parse(localStorage.getItem('ingredients')) || [];

  ingredientsLocal: Ingredient[] = JSON.parse(
    localStorage.getItem('ingredients')
  );

  getIngredients() {
    return this.ingriedients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingriedients.push(ingredient);
    this.ingredientsChanged.next(this.ingriedients.slice());
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

    this.ingredientsChanged.next(this.ingriedients.slice());
    console.log('Changed ingredient list after pushing ingredients');
  }
}
