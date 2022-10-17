import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
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
  private isListItemActive: Subscription;
  selectedListItem: Ingredient; 
  
  constructor(private slService: ShoppingListService, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.ingriedients = this.slService.getIngredients();
    // listening to the event emiter formthe service to update live the new ingredient
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (recievedIngredients: Ingredient[]) => {
        // add anf if here?
        this.ingriedients = recievedIngredients;
      }
    );
    this.isListItemActive = this.slService.startedEditingShoppingListItem
    .subscribe(
      (index: number) => {
        this.selectedListItem = this.slService.getIngredient(index)
        console.log(this.selectedListItem)
        });
       
  }

  onEditSLItem(index: number, select){
    this.slService.startedEditingShoppingListItem.next(index)
    // console.log(select)
    // console.log(this.elRef.nativeElement)
    // console.log(select.classList)
  
    // !select.classList.contains('red') && this.selectedItem ? select.classList.add('red'): select.classList.remove('red')
 
  }


  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
    this.isListItemActive.unsubscribe();
  }
}