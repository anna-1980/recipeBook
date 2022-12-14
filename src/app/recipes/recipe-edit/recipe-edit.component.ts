import { formatPercent } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false; //to check if we are adding new recipe or editing an existing one (see .subscribe conditions)
  recipeForm: FormGroup;



  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; //id is returned as a string so you need to convert it to a anumber
      this.editMode = params['id'] != null; //check if params has an id property, if it has, there is value if not it will be null, check returns true or false
      // console.log('is edit mode ? ' + this.editMode);
      this.initForm();
      // ----- remember to synch it with the HTML you need ReactiveFormsModule in the app.module.ts
    });
  }

  private initForm() {
    // ----- the form shoulld be called whenever our route parameters change !!! -------//
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]); // is initialised with a default of an empty array because we do not have any ingredients at the beginning

    if (this.editMode) {
      // you can only ask for recipe id if we are in the edit mode
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name-a': new FormControl(ingredient.name, Validators.required),
              'amount-a': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
              'unit-a': new FormControl(ingredient.unit, Validators.required),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      //key value pairs that we do want to register
      'name-from-form': new FormControl(recipeName, Validators.required), // it is important to decide if we are in editMode or not
      'imagePath-from-form': new FormControl(
        recipeImagePath,
        Validators.required
      ),
      'description-from-form': new FormControl(
        recipeDescription,
        Validators.required
      ),
      'ingredients': recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
    // they are generated by  *ngFor="let ingredientCtrl of getControls(); let i = index" but empty so formControlName has to be name-a as well 
        'name-a': new FormControl(null, Validators.required),
        'amount-a': new FormControl(null,  [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),]),
        'unit-a': new FormControl(null, Validators.required),
      })
    );

    // console.log(this.recipeForm);
  }

  onSubmit() {
  //---- alternative approach to re-naming the key: values of the ofrm to be passed correctly to create Ingredinet to 
  //---- but it requires renaming all array ingredients keys ... it is doable, requires way more code...
    // console.log(this.recipeForm);
    const ingredientList = this.recipeForm.value['ingredients']
    const[ desArray1, desArray2, desArray3, desArray4]= ingredientList
      // console.log(JSON. stringify(desArray1))
    const {'amount-a': amount, 'name-a': name, 'unit-a': unit}= desArray1
      // console.log(amount + name + unit)

    let recipeIngredients = [{
      amount: amount,
      name: name, 
      unit: unit
    }]
    // console.log(recipeIngredients)
  //-----------------------------------------------------------------//
    const newRecipe = new Recipe(
      this.recipeForm.value['name-from-form'],
      this.recipeForm.value['description-from-form'],
      this.recipeForm.value['imagePath-from-form'], 
      //because the keys for Ingredients are name: and amount: and unit: and the object agFOrms creates (bacause of the way input fields are named) are name-a: amount-a unit-a: you have to map them to diferent key names like below
      this.recipeForm.value['ingredients'].map(ingredients => { return {"name": ingredients["name-a"], "amount": ingredients["amount-a"], "unit": ingredients["unit-a"]}; })
      // recipeIngredients
      )

    // console.log(this.recipeForm.value['ingredients'])
    // console.log(this.recipeForm.value['ingredients'].map(({key, value}) => ({[key]: value})))
    // console.log(this.recipeForm.value['ingredients'].map(ingredients => ( {"name": ingredients["name-a"], "amount": ingredients["amount-a"], "unit": ingredients["unit-a"]} )))
    

    if (this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe)
      // console.log(this.recipeForm)
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(newRecipe)
      // this.recipeService.addRecipe(this.recipeForm.value)
    }
     //to get live update of new recipe added you need to add onChange in recipeService.ts
     this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number){
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getControls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
