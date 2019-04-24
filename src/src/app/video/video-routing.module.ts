import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';
import { RoutesNoSlash, forFeatureRouting } from "../services/route-paths";
import { CreateVideoComponent } from './components/create-video/create-video.component';

const routes: Routes = [
    {
        path: forFeatureRouting(RoutesNoSlash.videoCreatePath),
        component: CreateVideoComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VideoRoutingModule { }