import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DemoAppComponent } from './components/promises-observables/demo-app/demo-app.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        title: 'Home'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'contact-list',
        loadComponent: () => import('./components/signal-crud/contact-list/contact-list.component').then(m => m.ContactListComponent),
        title: 'Contact List'

    },
    {
        path: 'add',
        loadComponent: () => import('./components/signal-crud/add-contact/add-contact.component').then(m => m.AddContactComponent),
        title: 'Add Contact'

    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/signal-crud/edit-contact/edit-contact.component').then(m => m.EditContactComponent),
        title: 'Edit Contact'
    },
    {
        path: 'resource-demo',
        loadComponent: () => import('./components/resource-demo/resource-demo.component').then(m => m.ResourceDemoComponent),
        title: 'Edit Contact'
    },
    {
        path: 'login-form',
        loadComponent: () => import('./components/login-form/login-form.component').then(m => m.LoginFormComponent),           
        title: 'Login Form'
    },
    {
        path:'store-view',
        loadComponent: () => import('./components/license-plate/store-view/store-view.component').then(m => m.StoreViewComponent),
        title: 'Store View'
    },
    {
        path: "vehicle-selection", 
       loadComponent: () => import('./components/vehicle-selection/vehicle-selection.component').then(m => m.VehicleSelectionComponent),
        title: 'Vehicle Selection'
    }, 
    {
        path: "player-search", 
        loadComponent: () => import('./components/player/player-search/player-search.component').then(m => m.PlayerSearchComponent),
        title: 'Player Search'
    },
    {
        path: "weather", 
        loadComponent: () => import('./components/ng-template/weather.component').then(m => m.WeatherComponent),
        title: 'Ng Template'
    },
    {
        path: "demo-app", 
        component: DemoAppComponent,
        title: 'Promises and Observables'
    },
];
