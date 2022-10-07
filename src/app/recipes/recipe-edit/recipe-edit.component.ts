import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false; //to check if we are adding new recipe or editing an existing one (see .subscribe conditions)

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; //id is returned as a string so you need to convert it to a anumber
          this.editMode = params['id'] != null; //check if params has an id property, if it has, there is value if not it will be null, check returns true or false
          console.log(this.editMode)
        }
      )
  }

}
