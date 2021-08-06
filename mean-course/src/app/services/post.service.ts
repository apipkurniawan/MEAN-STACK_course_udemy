import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { PostWrapper } from './../models/post-wrapper.model';

const API_URL = 'http://localhost:3000/api';
@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: PostWrapper[] = [];
    private postUpdated = new Subject<PostWrapper[]>();

    constructor(
        private httpClient: HttpClient
    ) { }

    getPosts() {
        return this.httpClient.get<{ message: string, posts: PostWrapper[] }>(API_URL + '/posts')
            .subscribe(post => {
                this.posts = post.posts;
                this.postUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: PostWrapper = { id: 'vjjstt', title, content };
        this.httpClient.post<{ message: string }>(API_URL + '/posts', post)
            .subscribe(responseData => {
                console.log(responseData.message);
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);
            });
    }
}