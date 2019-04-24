import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesNoSlash, forFeatureRouting } from "../services/route-paths"; 
import { NavigationComponent } from './components/navigation/navigation.component';

const routes: Routes = [
    {
        path: forFeatureRouting(RoutesNoSlash.indexPath)+ "/:id",
        component: NavigationComponent,
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