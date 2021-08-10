import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthDataWrapper } from './auth-data.model';

const API_URL = environment.DEV_API_URL_AUTH + '/users';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token: string;

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    getToken() {
        return this.token;
    }

    createUser(email: string, password: string) {
        const authData: AuthDataWrapper = { email, password };
        this.httpClient.post(API_URL + '/signup', authData)
            .subscribe(response => {
                console.log(response);
            });
    }

    login(email: string, password: string) {
        const authData: AuthDataWrapper = { email, password };
        this.httpClient.post<{ token: string }>(API_URL + '/login', authData)
            .subscribe(response => {
                this.token = response.token;
                console.log('token', this.token);
                this.router.navigate(['/posting']);
            });
    }
}