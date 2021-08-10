import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
    }

    onSignUp(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService.createUser(form.value.email, form.value.password)
            .subscribe(res => {
                console.log('response.createUser ', res);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Info',
                    detail: 'User berhasil didaftarkan!'
                });
            });
    }

}
