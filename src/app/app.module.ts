import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
 
 
// import { ShoppingListService } from './shopping-list/shopping-list.service';
// import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
 
import { AuthInterceptorTsService } from './auth/auth-interceptor.ts.service';
 
 
///after creating recipe.module you export them, and then declare then in the imports: of the app.module not in the components anymore
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    // DropdownDirective,
    // AuthComponent,
    // LoadingSpinnerComponent,
    // AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule, 
    SharedModule, 
    AuthModule
  ],
  providers: [
    // ShoppingListService,
    // RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorTsService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
