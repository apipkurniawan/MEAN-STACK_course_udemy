import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
    // styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    postDesk: string;
    postTitle: string;
    StoredPost = [];

    constructor() { }

    ngOnInit(): void { }

    onAddPost() {
        const post = {
            title: this.postTitle,
            content: this.postDesk
        };
        this.StoredPost.push(post);
    }
}
