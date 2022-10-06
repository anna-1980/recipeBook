import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingriedients: Ingredient[];

  // ingredientsLocal= null;
  // ingredientsLocal: Ingredient[] = JSON.parse(localStorage.getItem('ingredients'));

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingriedients = this.slService.getIngredients();

    // listening to the event emiter formthe service to update live the new ingredient
    this.slService.ingredientsChanged
      .subscribe(
      (recievedIngredients: Ingredient[]) => {
        // add anf if here?
        this.ingriedients = recievedIngredients;
      }
      );
  }

  // onIngredientAdded(ingredient: Ingredient) {

  // }
}