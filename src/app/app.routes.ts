import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { StoreViewComponent } from './components/license-plate/store-view/store-view.component';
import { VehicleSelectionComponent } from './components/vehicle-selection/vehicle-selection.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login-form',
        component: LoginFormComponent
    },
    {
        path:'store-view',
        component: StoreViewComponent
    },
    {
        path: "vehicle-selection", 
        component: VehicleSelectionComponent
    },
 
    // {
    //     path: "checkout", 
    //     component: CheckoutViewComponent
    // },
];
