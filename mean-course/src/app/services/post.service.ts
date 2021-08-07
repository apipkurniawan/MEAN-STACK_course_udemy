import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { PostWrapper } from 'src/app/models/post-wrapper.model';

const API_URL = environment.DEV_API_URL_AUTH + '/posts';
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

    getPostById(id: string) {
        return this.httpClient.get<{ _id: string, title: string, content: string }>(`${API_URL}/${id}`);
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

    updatePost(id: string, title: string, content: string) {
        const post: PostWrapper = { id, title, content };
        this.httpClient.put(`${API_URL}/${id}`, post)
            .subscribe(response => {
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(p => p.id == post.id);
                updatedPosts[oldPostIndex] = post;
                this.posts = updatedPosts;
                this.postUpdated.next([...this.posts]);
            });
    }

    deletePost(id: string) {
        this.httpClient.delete(`${API_URL}/${id}`)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(post => post.id !== id);
                this.posts = updatedPosts;
                this.postUpdated.next([...this.posts]);
            });
    }
}