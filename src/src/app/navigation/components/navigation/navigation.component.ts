import { Component } from '@angular/core';
import { NavStoreService } from 'src/app/services/data-services/nav-store.service.1';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INavIndex } from 'src/app/services/models/navigation/nav-index';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  currentDir$: Observable<INavIndex>;

  constructor(
    private navService: NavStoreService,
    private route: ActivatedRoute,

  ) {
    this.currentDir$ = navService.navIndex$;
    let id = Number(this.route.snapshot.paramMap.get("id"));
    this.navService.setNav(id); 
   }

  ngOnInit() {
  }

  onClickDir(id) {
    if (id === null) {
      return;
    }
    this.navService.setNav(id);
  }

}
