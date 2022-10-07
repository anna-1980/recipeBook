import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeNewComponent } from './recipes/recipe-new/recipe-new.component';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: RecipeNewComponent}, 
    {path: 'new', component: RecipeEditComponent}, //hard coded route HAS to come before dinamical parameter route
    {path: ':id', component: RecipeDetailComponent }, 
    {path: ':id/edit', component: RecipeEditComponent}
  ]},
  { path: 'shopping-list', component: ShoppingListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
