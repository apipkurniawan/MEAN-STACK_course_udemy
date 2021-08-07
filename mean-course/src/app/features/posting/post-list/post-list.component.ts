import { PostWrapper } from '../../../models/post-wrapper.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    posts: PostWrapper[] = [];
    private postSub: Subscription;
    isLoading = false;

    constructor(public postService: PostService) { }

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData() {
        this.isLoading = true;
        this.postService.getPosts();
        this.postSub = this.postService.getPostUpdateListener().subscribe((post: PostWrapper[]) => {
            this.posts = post;
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        });
    }

    ngOnDestroy() {
        this.postSub.unsubscribe();
    }

    onDelete(postId: string) {
        this.postService.deletePost(postId);
    }

}
