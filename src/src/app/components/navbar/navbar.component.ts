import { Component } from '@angular/core';
import { RoutePaths } from '../../services/route-paths';
import { AuthStoreService } from 'src/app/services/DataServices/auth-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    public routePaths: RoutePaths,
    public authStoreService: AuthStoreService,
  ) {}

  onClickLogout(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.authStoreService.setUser(null);
  }

}
