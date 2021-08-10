import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostWrapper } from '../../../models/post-wrapper.model';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

    posts: PostWrapper[] = [];
    private postSub: Subscription;
    isLoading = false;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    rowsPerPage = [2, 3, 5];
    totalRows = 0;
    row = 2;

    constructor(
        public postService: PostService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) { }

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
        this.postSub = this.postService.getPostUpdateListener().subscribe((postData: { posts: PostWrapper[], postCount: number }) => {
            this.posts = postData.posts;
            this.totalRows = postData.postCount;
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
            });
    }

    ngOnDestroy() {
        this.postSub.unsubscribe();
        this.authListenerSubs.unsubscribe();
    }

    async onDelete(postId: string) {
        await this.postService.deletePost(postId).toPromise();
        this.fetchData(this.row, 1);
    }

    paginate(pageData) {
        console.log(pageData)
        this.fetchData(pageData.rows, Number(pageData.page) + 1);
    }
}
