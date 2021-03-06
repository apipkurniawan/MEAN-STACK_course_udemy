import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { FeaturesModule } from '../features/features.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        AuthRoutingModule
    ],
    exports: []
})
export class AuthModule { }
