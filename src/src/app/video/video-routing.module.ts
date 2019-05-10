import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';
import { CreateVideoComponent } from './components/create-video/create-video.component';
import { NotateVideoComponent } from './components/notate-video/notate-video.component';
import { ImportVideosComponent } from './components/import-videos/import-videos.component';
import { ExtensionVideoImportGuard } from '../services/guards/extension-video-import';

const routes: Routes = [
    {
        path: "create/:id",
        component: CreateVideoComponent,
    },
    {
        path: "note/:id",
        component: NotateVideoComponent,
    },
    {
        path: "import",
        component: ImportVideosComponent,
        canActivate:[ExtensionVideoImportGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VideoRoutingModule { }