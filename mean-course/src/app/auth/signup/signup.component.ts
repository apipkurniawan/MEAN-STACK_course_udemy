import { MessageService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

    private authStatusSubs: Subscription;

    constructor(
        private authService: AuthService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                // this.isLoading = authStatus;
                console.log('authStatusSignUp ', authStatus);
            });
    }

    ngOnDestroy() {
        this.authStatusSubs.unsubscribe();
    }

    onSignUp(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService.createUser(form.value.email, form.value.password);
    }

}
