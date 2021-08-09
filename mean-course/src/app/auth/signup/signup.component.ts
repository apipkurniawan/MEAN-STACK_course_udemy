import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

    constructor(
    ) { }

    ngOnInit(): void {
    }

    onSignUp(form: NgForm) {

    }

}
