import { Directive, HostBinding, HostListener } from '@angular/core';

//remember to add your directive in App.module !!!
@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // bind to the properties of the element the directive is place on
  //'class' property of this element is simply array of all the classes
  // so you attach or detach open class the the class array of the element
  @HostBinding('class.open') isOpen = false; //directive

  @HostListener('click') toggleOpen() {
    //listening to a click event
    this.isOpen = !this.isOpen; // set it to what it is currently not :)
  }
}
