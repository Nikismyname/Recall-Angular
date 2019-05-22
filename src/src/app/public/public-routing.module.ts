import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicViewComponent } from './components/public-view/public-view.component';

const routes: Routes = [
    {
        path: "public-view", 
        component: PublicViewComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicRoutingModule { }