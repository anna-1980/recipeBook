import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // @Output() featureSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  // onSelect(feature: string, event) {
  //   console.log('button clicked');
  //   console.log(feature);
  //   console.log(event.value);
  //   this.featureSelected.emit(feature);
  // }
}
