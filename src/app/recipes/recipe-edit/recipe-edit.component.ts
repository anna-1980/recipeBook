import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false; //to check if we are adding new recipe or editing an existing one (see .subscribe conditions)
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; //id is returned as a string so you need to convert it to a anumber
          this.editMode = params['id'] != null; //check if params has an id property, if it has, there is value if not it will be null, check returns true or false
          console.log(this.editMode)
          this.initForm();
      // ----- remember to synch it with the HTML you need ReactiveFormsModule in the app.module.ts
        }
      )
  }

  private initForm(){
    // ----- the form shoulld be called whenever our route parameters change !!! -------//
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if(this.editMode){
      // you can only ask for recipe id if we are in the edit mode
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeImagePath = recipe.imagePath
      recipeDescription = recipe.description
    }
    this.recipeForm = new FormGroup({
      //key value pairs that we do want to register
      'name-from-form': new FormControl(recipeName),  // it is important to decide if we are in editMode or not
      'imagePath-from-form': new FormControl(recipeImagePath),
      'description-from-form': new FormControl(recipeDescription)
    });
  }

  onSubmit(){
    console.log(this.recipeForm)
  }

}
