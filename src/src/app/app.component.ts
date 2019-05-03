import { Component } from '@angular/core';
import { AuthStoreService } from './services/DataServices/auth-store.service';
import { ElectronService } from 'ngx-electron';
import { win } from 'ngx-youtube-player';
import { url } from 'inspector';
import { NavStoreService } from './services/DataServices/nav-store.service.1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // url: string = ""; 

  title = 'recall';
  constructor(
    private authService: AuthStoreService,
    private electronService: ElectronService,
    private navService: NavStoreService,
  ) {
    if (this.electronService.isElectronApp) {
      electronService.webFrame.setZoomFactor(1.75);
    }

    let loginData = localStorage.getItem("user");
    if (loginData !== null) {
      this.authService.setUser(JSON.parse(loginData)); 
    }
  }
}
