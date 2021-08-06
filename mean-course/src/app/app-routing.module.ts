import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorComponent } from '../app/features/calculator/calculator.component';
import { DashboardComponent } from '../app/features/dashboard/dashboard.component';
import { PageNotFoundComponent } from '../app/components/page-not-found/page-not-found.component';
import { PostContainerComponent } from './features/posting/post-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard', pathMatch: 'full'
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
    path: 'posting',
    component: PostContainerComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
