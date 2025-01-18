import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PlateStoreComponent } from './components/plate-store/plate-store.component';

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
        path:'plate-store',
        component: PlateStoreComponent

    }
    // {
    //     path: "cart", 
    //     component: CartViewComponent
    // },
 
    // {
    //     path: "checkout", 
    //     component: CheckoutViewComponent
    // },
];
