import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
 

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // recipes related routes were outsourced to the recipe.module

  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
