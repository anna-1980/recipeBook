import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeNewComponent } from "./recipe-new/recipe-new.component";
import { RecipesResolver } from "./recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";
 
const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: RecipeNewComponent },
          { path: 'new', component: RecipeEditComponent }, //hard coded route HAS to come before dinamical parameter route
          {
            path: ':id',
            component: RecipeDetailComponent,
            resolve: [RecipesResolver],
          },
          {
            path: ':id/edit',
            component: RecipeEditComponent,
            resolve: [RecipesResolver],
          },
        ],
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}