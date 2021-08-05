import { PostWrapper } from '../../models/post-wrapper.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-post-container',
    templateUrl: './post-container.component.html'
    // styleUrls: ['./post-create.component.css']
})
export class PostContainerComponent implements OnInit {

    storedPosts: PostWrapper[] = [];

    constructor() { }

    ngOnInit(): void { }

    onAddedPost(post: PostWrapper) {
        this.storedPosts.push(post);
    }
}
