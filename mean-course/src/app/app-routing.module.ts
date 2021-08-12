import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorComponent } from '../app/features/calculator/calculator.component';
import { DashboardComponent } from '../app/features/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { PostCreateComponent } from './features/posting/post-create/post-create.component';
import { PostListComponent } from './features/posting/post-list/post-list.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'calculator',
    component: CalculatorComponent
  },
  // {
  //   path: 'post-list',
  //   component: PostListComponent,
  // },
  {
    path: 'post-create',
    component: PostCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editPosting/:postId',
    component: PostCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
