import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private authStatusSubs: Subscription;

    constructor(
        private authService: AuthService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                // this.isLoading = authStatus;
                console.log('authStatusLogin ', authStatus);
            });
    }

    ngOnDestroy() {
        this.authStatusSubs.unsubscribe();
    }

    onLogin(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService.login(form.value.email, form.value.password);
    }
}
