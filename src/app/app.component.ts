import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cooking-app';

  // loadedFearute = 'recipe';
  loadedFearute = 'shopping-list';

  onNavigate(feature: string) {
    // console.log(feature)
    this.loadedFearute = feature;
  }
}
