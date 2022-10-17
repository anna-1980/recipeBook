import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  // removed @ViewChild after adding Forms
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  // @ViewChild('unitInput', { static: false }) unitInputRef: ElementRef;

  // ingriedientAdded = new EventEmitter<{name: string, amount: number, unit: string}>();
  // removed on Lecture 120 @Output() ingriedientAdded = new EventEmitter<Ingredient>();
  subscription: Subscription;
  //storing the mode we are in , editing or adding new
  editMode = false;
  editedItemIndexNumber: number;
  editedCurrentlyItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.slService.startedEditingShoppingListItem.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndexNumber = index;
        this.editedCurrentlyItem = this.slService.getIngredient(index);
        
        // slForm.setValue makes wure the form gets populated with the selected item
        this.slForm.setValue({
          name: this.editedCurrentlyItem.name,
          amount: this.editedCurrentlyItem.amount,
          unit: this.editedCurrentlyItem.unit,
        });
      }
    );
    console.log(this.editedItemIndexNumber);
  }

  onAddItemOrSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const ingUnit = this.unitInputRef.nativeElement.value;
    const value = form.value;
    // console.log(form)
    const newIngredient = new Ingredient(
      form.value.name,
      form.value.amount,
      form.value.unit
    );
    // // this.ingriedientAdded.emit(newIngredient);
    if (this.editMode) {
      this.slService.updateIngredient(
        this.editedItemIndexNumber,
        newIngredient
      );
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    console.log('try to delete');
    console.log(this.editedItemIndexNumber);
    this.slService.deleteIngredient(this.editedItemIndexNumber);
    this.onClear();
    console.log('Success to delete');
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
