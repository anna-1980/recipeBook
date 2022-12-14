//feature module
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    FormsModule,
    // CommonModule,  // responsible for ngFor and ngIf
    RouterModule.forChild([
        { path: '', component: ShoppingListComponent },
    ]), 
    SharedModule,
  ]
   
})
export class ShoppingListModule {}
