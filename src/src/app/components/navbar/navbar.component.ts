import { Component, OnDestroy } from '@angular/core';
import { RoutePaths } from '../../services/route-paths';
import { AuthStoreService } from 'src/app/services/data-services/auth-store.service';
import { IUserInRole } from 'src/app/services/models/authentication/user-in-role';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  user: IUserInRole; 
  userSub: Subscription;
  
  constructor(
    public routePaths: RoutePaths,
    public authService: AuthStoreService,
    private toastr: ToastrService,
  ) {
    this.userSub = authService.user$.subscribe(x=> {
      this.user = x;
    });
  }

  onClickLogout(e) {
    if (!this.user.isUser) {
      this.toastr.info("You can not log out when you are loged out!");
      return; 
    }
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.authService.setUser(null);
  }

  ngOnDestroy(): void {
    if (this.userSub) { this.userSub.unsubscribe(); };
  }

}
