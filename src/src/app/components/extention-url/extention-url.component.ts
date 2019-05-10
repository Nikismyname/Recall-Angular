import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExtentionUrlService } from 'src/app/services/extention-url.service';
import { AuthStoreService } from 'src/app/services/data-services/auth-store.service';

@Component({
  selector: 'app-extention-url',
  templateUrl: './extention-url.component.html',
  styleUrls: ['./extention-url.component.css']
})
export class ExtentionUrlComponent {

  constructor(
    private route: ActivatedRoute,
    private extentionService: ExtentionUrlService,
    private authService: AuthStoreService,
  ) { 
    this.route.queryParams.subscribe(params => {
      let url = params["url"];
      this.extentionService.registerUrlToSet(url);
    });
  }

  ngOnInit() {
  }

}
