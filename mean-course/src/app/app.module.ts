import { NgModule } from '@angular/core';

import { ComponentsModule } from './components/components.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';
// import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    FeaturesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
