import { Component } from '@angular/core';
import { AuthStoreService } from 'src/app/services/data-services/auth-store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(
    public authService: AuthStoreService,
  ) { }

}
