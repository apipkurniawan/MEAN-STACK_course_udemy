import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorComponent } from '../app/features/calculator/calculator.component';
import { DashboardComponent } from '../app/features/dashboard/dashboard.component';
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
    path: 'calculator',
    component: CalculatorComponent
  },
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
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
