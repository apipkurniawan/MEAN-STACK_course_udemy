import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostWrapper } from '../../../models/post-wrapper.model';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    posts: PostWrapper[] = [];
    private postSub: Subscription;
    isLoading = false;

    rowsPerPage = [5, 10, 20];
    totalRows = 120;
    row = 5;

    constructor(public postService: PostService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
            if (param.has('postId')) {
                this.isLoading = false;
            } else {
                this.isLoading = true;
            }
            this.fetchData();
        });
    }

    fetchData() {
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
