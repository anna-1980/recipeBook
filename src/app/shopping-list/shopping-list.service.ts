// import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  //you have to inform the new component that new data is available ! below: (obsolete with observables introduced)
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>(); //instead of emit call next instead
  //the parts where we "consume" Ingredients do not have to change syntax
  startedEditingShoppingListItem = new Subject<number>();

  // private ingriedients: Ingredient[] =
  //   JSON.parse(localStorage.getItem('ingredients')) || [];

  ingredientsLocal: Ingredient[] = JSON.parse(
    localStorage.getItem('ingredients')
  );

  getIngredient(index: number) {
    // return this.ingriedients[index]
    return this.ingredientsLocal[index];
  }

  getIngredients() {
    return this.ingredientsLocal.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredientsLocal.push(ingredient);
    this.ingredientsChanged.next(this.ingredientsLocal.slice());
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

    this.ingredientsLocal.push(...ingredients);

    if (this.ingredientsLocal === null) {
      this.ingredientsLocal = [];
    } else {
      this.ingredientsLocal = JSON.parse(localStorage.getItem('ingredients'));
    }
    this.ingredientsLocal.push(...ingredients);
    localStorage.setItem('ingredients', JSON.stringify(this.ingredientsLocal));
    console.log('pushing ingredients' + this.ingredientsLocal);

    this.ingredientsChanged.next(this.ingredientsLocal.slice());
    console.log('Changed ingredient list after pushing ingredients');
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    // this.ingriedients[index] = newIngredient;
    this.ingredientsLocal[index] = newIngredient;
    localStorage.setItem('ingredients', JSON.stringify(this.ingredientsLocal));
    this.ingredientsChanged.next(this.ingredientsLocal.slice());
    // console.log(this.ingredientsLocal)
  }

  deleteIngredient(index: number) {
    console.log(index);
    console.log(this.ingredientsLocal);
    this.ingredientsLocal.splice(index, 1)
    localStorage.setItem('ingredients', JSON.stringify(this.ingredientsLocal));
    this.ingredientsChanged.next(this.ingredientsLocal.slice());
    // this.ingredientsLocal = this.ingredientsLocal.splice(index, 1)
    // this.ingriedients = this.ingriedients.splice(index, 1)
  }
}
