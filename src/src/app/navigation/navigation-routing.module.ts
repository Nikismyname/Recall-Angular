import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MoveVideoComponent } from './components/move-video/move-video.component'; 
import { UserGuard } from '../services/guards/user.gourd';

const routes: Routes = [
    {
        path: "index/:id",
        component: NavigationComponent,
        canActivate:[UserGuard]
    },
    {
        path: "videoMove/:id",
        component: MoveVideoComponent,
        canActivate:[UserGuard]
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