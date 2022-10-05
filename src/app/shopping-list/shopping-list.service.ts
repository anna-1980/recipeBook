import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
//you have to inform the new component taht new data is available !
ingredientsChanged = new EventEmitter<Ingredient[]>()

   private ingriedients: any[] =  
    // [new Ingredient('Apples', 5, 'pieces'),
    // new Ingredient('Carrots', 2, 'pieces'),
    // new Ingredient('Tofu', 1, 'kg'),]
    JSON.parse(localStorage.getItem('ingredients')) || []
   ;

   ingredientsLocal: Ingredient[] = JSON.parse(localStorage.getItem('ingredients'));


    getIngredients(){
        return this.ingriedients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingriedients.push(ingredient);
        
        this.ingredientsChanged.emit(this.ingriedients.slice())
//-------------------------------------------------------------//
           
    // this.ingriedients.push(ingredient);
    // console.log(ingredient)
    if (this.ingredientsLocal === null  ) {
        console.log('1' + this.ingredientsLocal);
        this.ingredientsLocal = [];
      } else {
        this.ingredientsLocal = JSON.parse(localStorage.getItem('ingredients'));
        console.log('2' + this.ingredientsLocal);
       
      }
        this.ingriedients.push(ingredient);
        console.log("log ingredients" + this.ingriedients);
        this.ingredientsLocal.push({name: ingredient.name, amount: ingredient.amount, unit: ingredient.unit});
        localStorage.setItem('ingredients', JSON.stringify(this.ingredientsLocal));
        console.log('last log of ingredientsLocal');
        console.log(this.ingredientsLocal);
    }

}