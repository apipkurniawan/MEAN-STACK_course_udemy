import { PostWrapper } from '../../../models/post-wrapper.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html'
    // styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    posts: PostWrapper[] = [];
    private postSub: Subscription;

    constructor(public postService: PostService) { }

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData() {
        this.postService.getPosts();
        this.postSub = this.postService.getPostUpdateListener().subscribe((post: PostWrapper[]) => {
            this.posts = post;
        });
    }

    ngOnDestroy() {
        this.postSub.unsubscribe();
    }

    onDelete(postId: string) {
        this.postService.deletePost(postId).subscribe(() => {
            this.fetchData();
        });
    }

    onEdit(postId: string) {
        // ...
    }
}
