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

    rowsPerPage = [2, 3, 5];
    totalRows = 10;
    row = 2;

    constructor(public postService: PostService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
            if (param.has('postId')) {
                this.isLoading = false;
            } else {
                this.isLoading = true;
            }
            this.fetchData(this.row, 1);
        });
    }

    fetchData(row: number, currentPage: number) {
        this.postService.getPosts(row, currentPage);
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

    paginate(pageData) {
        console.log(pageData)
        this.fetchData(pageData.rows, Number(pageData.page) + 1);
    }
}
