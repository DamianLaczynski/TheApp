import { Routes } from '@angular/router';
import { UserAppComponent } from './user-application/user-app.component';

export const routes: Routes = [
    {path: '', redirectTo: "/app", pathMatch: 'full'},
    {path: 'app', component: UserAppComponent}
];
