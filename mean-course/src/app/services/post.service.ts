import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { PostWrapper } from './../models/post-wrapper.model';

const API_URL = 'http://localhost:3000/api/posts';
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
        return this.httpClient.get<{ message: string, posts: any }>(API_URL)
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    };
                });
            }))
            .subscribe(transformedPost => {
                this.posts = transformedPost;
                this.postUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: PostWrapper = { id: null, title, content };
        this.httpClient.post<{ message: string, postId: string }>(API_URL, post)
            .subscribe(responseData => {
                const postId = responseData.postId;
                post.id = postId;
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);
            });
    }

    deletePost(id: string) {
        return this.httpClient.delete(`${API_URL}/${id}`);
    }
}