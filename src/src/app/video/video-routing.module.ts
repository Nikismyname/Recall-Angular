import { NgModule } from "@angular/core"
import { RouterModule, Routes } from '@angular/router';
import { RoutesNoSlash, forFeatureRouting } from "../services/route-paths";
import { CreateVideoComponent } from './components/create-video/create-video.component';
import { NotateVideoComponent } from './components/notate-video/notate-video.component';
// import { Test1Component } from './components/RichTextEditorTests/test1/test1.component';
// import { CustomYoutubePlayerComponent } from "./components/custom-youtube-player/custom-youtube-player.component";

const routes: Routes = [
    {
        path: forFeatureRouting(RoutesNoSlash.videoCreatePath+ "/:id"),
        component: CreateVideoComponent,
    },
    {
        path: forFeatureRouting(RoutesNoSlash.videoNotePath + "/:id"),
        component: NotateVideoComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VideoRoutingModule { }