import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
    }

    onLogin(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.authService.login(form.value.email, form.value.password);
        this.messageService.add({
            severity: 'success',
            summary: 'Info',
            detail: 'anda berhasil login!'
        });
    }
}
