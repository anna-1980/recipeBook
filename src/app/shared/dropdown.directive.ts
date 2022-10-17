import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

//remember to add your directive in App.module !!!
@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // bind to the properties of the element the directive is place on
  //'class' property of this element is simply array of all the classes
  // so you attach or detach open class the the class array of the element
  @HostBinding('class.open') 
  @HostBinding('red') 
  isOpen = false; //directive

  @HostListener('document:click', ['$event']) 
  toggleOpen(event: Event) {
    //listening to a click event

    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
    // this.isOpen = !this.isOpen;
  }
  constructor(private elRef: ElementRef) {}
}
