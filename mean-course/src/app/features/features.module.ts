import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CalculatorComponent } from './calculator/calculator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostCreateComponent } from './posting/post-create/post-create.component';
import { PostListComponent } from './posting/post-list/post-list.component';
import { PostHeaderComponent } from './posting/post-header/post-header.component';

@NgModule({
  declarations: [
    CalculatorComponent,
    DashboardComponent,
    PostCreateComponent,
    PostListComponent,
    PostHeaderComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    PostHeaderComponent
  ]
})
export class FeaturesModule { }
