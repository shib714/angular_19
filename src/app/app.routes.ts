import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { StoreViewComponent } from './components/store-view/store-view.component';

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
