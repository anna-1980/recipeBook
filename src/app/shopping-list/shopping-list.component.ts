import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingriedients: any[] =[
    new Ingredient('Apples', 5, 'pieces'), 
    new Ingredient('Carrots', 2, "pieces"), 
    new Ingredient('Tofu', 1, "kg"), 
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient: Ingredient){
    
    this.ingriedients.push(ingredient);
  }
}

