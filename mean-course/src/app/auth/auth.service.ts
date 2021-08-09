import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthDataWrapper } from './auth-data.model';

const API_URL = environment.DEV_API_URL_AUTH + '/users';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient
    ) { }

    createUser(email: string, password: string) {
        const authData: AuthDataWrapper = { email, password };
        this.httpClient.post(API_URL + '/signup', authData)
            .subscribe(response => {
                console.log(response);
            });
    }
}