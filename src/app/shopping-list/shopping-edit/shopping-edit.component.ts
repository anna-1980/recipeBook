import {
  Component,
  ElementRef,
 
  OnInit,
 
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @ViewChild('unitInput', { static: false }) unitInputRef: ElementRef;

  // ingriedientAdded = new EventEmitter<{name: string, amount: number, unit: string}>();
  // removed on Lecture 120 @Output() ingriedientAdded = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const ingUnit = this.unitInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount, ingUnit);
    // this.ingriedientAdded.emit(newIngredient);
    this.slService.addIngredient(newIngredient)
  }
}
