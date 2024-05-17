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
import { ChatComponent } from './user-application/messages/ui/chat/chat.component';
import { KanbanBoardComponent } from './user-application/tasks/ui/kanban-board/kanban-board.component';
import { ProfileComponent } from './user-application/user/profile/profile.component';
import { ProfileSettingsComponent } from './user-application/user/ui/profile-settings/profile-settings.component';
import { ScheduleComponent } from './user-application/schedule/schedule.component';

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
      { path: 'schedule', component: ScheduleComponent },
      { path: 'tasks', component: KanbanBoardComponent },
      { path: 'tasks/:taskId', component: KanbanBoardComponent },
      { path: 'settings', component: NotFoundComponent },
      { path: 'info', component: NotFoundComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: '', redirectTo: 'settings', pathMatch: 'full' },
          { path: 'settings', component: ProfileSettingsComponent },
        ],
      },
      { path: 'messages', component: NotFoundComponent },
      { path: 'messages/:chatId', component: ChatComponent },
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
