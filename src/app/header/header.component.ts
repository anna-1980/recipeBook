import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected = new EventEmitter<string>();

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataSotrageService: DataStorageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !user ? false : true;
      // this.isAuthenticated = !!user , a shorter version of the above expression, 
    });
  }

  onSaveRecipes(){
    this.dataSotrageService.saveRecipes();
  }

  onGetRecipes(){
    this.dataSotrageService.getRecipes().subscribe();
  }
  // onSelect(feature: string, event) {
  //   console.log('button clicked');
  //   console.log(feature);
  //   console.log(event.value);
  //   this.featureSelected.emit(feature);
  // }

  ngOnDestroy(): void {
    
  }
}
