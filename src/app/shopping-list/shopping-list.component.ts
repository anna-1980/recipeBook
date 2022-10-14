import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingriedients: Ingredient[];
  // after adding Observables though no syntax for .subscribe change (we subscribe to subject) it is good practive to
  // put in property and clean it up after we leave the component
  private igChangeSub: Subscription;

  // ingredientsLocal= null;
  // ingredientsLocal: Ingredient[] = JSON.parse(localStorage.getItem('ingredients'));

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingriedients = this.slService.getIngredients();
    // listening to the event emiter formthe service to update live the new ingredient
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (recievedIngredients: Ingredient[]) => {
        // add anf if here?
        this.ingriedients = recievedIngredients;
      }
    );
  }

  onEditSLItem(index: number){
    this.slService.startedEditingShoppingListItem.next(index)
    console.log('editing item mode ' + index)
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}