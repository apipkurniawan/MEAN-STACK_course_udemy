import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
    // styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    newPost = 'NO CONTENT';
    postInput: string;

    constructor(
    ) { }

    ngOnInit(): void {

    }

    onSave() {
        this.newPost = this.postInput;
    }
}
