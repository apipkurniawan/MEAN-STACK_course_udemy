import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// const API_URL = 'https://us-central1-fir-functions-api-b25bc.cloudfunctions.net';
const API_URL = 'http://cors-anywhere.localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllData() {
    return this.httpClient.get(API_URL + '/users');
  }
}
