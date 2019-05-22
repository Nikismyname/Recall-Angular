import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent {

  constructor(
    private readonly adminService: AdminService,
    private toastr: ToastrService,
  ) { }

  generatePublicVideos() {
    this.adminService.generatePublicVideos().pipe(take(1)).subscribe(
      () => {
        this.toastr.success("Videos Seeded!");
      },
      error => {
        console.log(error);
        this.toastr.error("Failed at Seeding Videos!");
      });
  }

  deleteTestVideos() {
    this.adminService.deleteTestPublicVideos().pipe(take(1)).subscribe(
      () => {
        this.toastr.success("Deleted Test Videos!");
      },
      error => { 
        console.log(error);
        this.toastr.error("Failed at daleting test videos!");
      }
    )
  }

  seedAdmin() {

  }

}
