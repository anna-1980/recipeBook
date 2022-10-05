import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingriedients: any[] =  
    // new Ingredient('Apples', 5, 'pieces'),
    // new Ingredient('Carrots', 2, 'pieces'),
    // new Ingredient('Tofu', 1, 'kg'),]
    JSON.parse(localStorage.getItem('ingredients')) || []
   ;

  ingredientsLocal =  JSON.parse(localStorage.getItem('ingredients'));

  constructor() {}

  ngOnInit(): void {}

  onIngredientAdded(ingredient: Ingredient) {
   
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