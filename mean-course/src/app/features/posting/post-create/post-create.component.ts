import { PostWrapper } from './../../../models/post-wrapper';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
    // styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    postDesk: string;
    postTitle: string;
    @Output() postCreated = new EventEmitter();

    constructor() { }

    ngOnInit(): void { }

    onAddPost() {
        const post: PostWrapper = {
            title: this.postTitle,
            content: this.postDesk
        };
        this.postCreated.emit(post);
    }
}
