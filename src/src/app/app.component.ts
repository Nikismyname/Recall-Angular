import { Component } from '@angular/core';
import { AuthStoreService } from './services/DataServices/auth-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recall';

  constructor(
    private authService: AuthStoreService,
  ) {
    let loginData = localStorage.getItem("user");
    if (loginData !== null) {
      this.authService.setUser(JSON.parse(loginData)); 
    }
  }
}
