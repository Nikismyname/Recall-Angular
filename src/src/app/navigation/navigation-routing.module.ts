import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MoveVideoComponent } from './components/move-video/move-video.component'; 

const routes: Routes = [
    {
        path: "index/:id",
        component: NavigationComponent,
    },
    {
        path: "videoMove/:id",
        component: MoveVideoComponent,
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class NavigationRoutingModule { }