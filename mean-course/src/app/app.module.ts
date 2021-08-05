import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    FeaturesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
