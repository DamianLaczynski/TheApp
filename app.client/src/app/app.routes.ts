import { Routes } from '@angular/router';
import { UserAppComponent } from './user-application/user-app.component';
import { AuthComponent } from './user-application/auth/auth.component';
import { LoginFormComponent } from './user-application/auth/ui/login-form/login-form.component';
import { RegisterFormComponent } from './user-application/auth/ui/register-form/register-form.component';
import { DashboardComponent } from './user-application/dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { LandingComponent } from './product/landing/landing.component';
import { DocsComponent } from './product/docs/docs.component';
import { FeaturesComponent } from './product/features/features.component';
import { NotFoundComponent } from './user-application/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/app/auth/login', pathMatch: 'full' },
  {
    path: 'app',
    component: UserAppComponent,
    children: [
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: 'login', component: LoginFormComponent },
          { path: 'register', component: RegisterFormComponent },
        ],
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'audience', component: NotFoundComponent },
      { path: 'materials', component: NotFoundComponent },
      { path: 'materials/:id', component: NotFoundComponent },
      { path: 'schedule', component: NotFoundComponent },
      { path: 'tasks', component: NotFoundComponent },
      { path: 'tasks/:id', component: NotFoundComponent },
      { path: 'settings', component: NotFoundComponent },
      { path: 'info', component: NotFoundComponent },
      { path: 'profile', component: NotFoundComponent },
      { path: 'messages', component: NotFoundComponent },
      { path: 'notifications', component: NotFoundComponent },

    ],
  },
  {
    path: 'product',
    component: ProductComponent,
    children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      {
        path: 'landing',
        component: LandingComponent,
      },
      {
        path: 'features',
        component: FeaturesComponent,
      },
      {
        path: 'docs',
        component: DocsComponent,
      },
    ],
  },
];
