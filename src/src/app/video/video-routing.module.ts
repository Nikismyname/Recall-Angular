import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';
import { CreateVideoComponent } from './components/create-video/create-video.component';
import { NotateVideoComponent } from './components/notate-video/notate-video.component';
import { ImportVideosComponent } from './components/import-videos/import-videos.component';
import { ExtensionVideoImportGuard } from '../services/guards/extension-video-import';
import { MakeConnectionComponent } from './components/make-connection/make-connection.component'; 
import { UserGuard } from '../services/guards/user.gourd';

const routes: Routes = [
    {
        path: "create/:id",
        component: CreateVideoComponent,
        canActivate: [UserGuard]
    },
    {
        path: "note/:id",
        component: NotateVideoComponent,
        canActivate: [UserGuard]
    },
    {
        path: "import",
        component: ImportVideosComponent,
        canActivate:[ExtensionVideoImportGuard, UserGuard]
    },
    {
        path: "connect/:id", 
        component: MakeConnectionComponent,
        canActivate:[UserGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VideoRoutingModule { }