import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthDataWrapper } from './auth-data.model';

const API_URL = environment.DEV_API_URL_AUTH + '/users';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token: string;
    private authStatusListener = new Subject<boolean>();

    constructor(
        private httpClient: HttpClient
    ) { }

    getToken() {
        return this.token;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, password: string) {
        const authData: AuthDataWrapper = { email, password };
        return this.httpClient.post(API_URL + '/signup', authData);
    }

    login(email: string, password: string) {
        const authData: AuthDataWrapper = { email, password };
        this.httpClient.post<{ token: string }>(API_URL + '/login', authData)
            .subscribe(response => {
                this.token = response.token;
                this.authStatusListener.next(true);
            });
    }
}