import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { PostWrapper } from 'src/app/models/post-wrapper.model';

const API_URL = `${environment.DEV_API_URL_AUTH}/posts`;
@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: PostWrapper[] = [];
    private postUpdated = new Subject<{ posts: PostWrapper[], postCount: number }>();

    constructor(
        private httpClient: HttpClient
    ) { }

    getPosts(postsPerPage: number, currentPage: number) {
        const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
        this.httpClient.get<{ message: string, posts: any, maxPosts: number }>(API_URL + queryParams)
            .pipe(map((postData) => {
                return {
                    posts: postData.posts.map(post => {
                        return {
                            title: post.title,
                            content: post.content,
                            id: post._id,
                            imagePath: post.imagePath,
                            creator: post.creator
                        };
                    }),
                    maxPosts: postData.maxPosts
                };
            }))
            .subscribe(transformedPostData => {
                this.posts = transformedPostData.posts;
                this.postUpdated.next({
                    posts: [...this.posts],
                    postCount: transformedPostData.maxPosts
                });
            });
    }

    getPostById(id: string) {
        return this.httpClient.get<{ _id: string, title: string, content: string, imagePath: string, creator: string }>(`${API_URL}/${id}`);
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
        return this.httpClient.post<{ message: string, post: PostWrapper }>(API_URL, postData);
    }

    updatePost(id: string, title: string, content: string, image: File | string) {
        let postData: FormData | PostWrapper;
        if (typeof (image) === 'object') {
            postData = new FormData();
            postData.append('id', id);
            postData.append('title', title);
            postData.append('content', content);
            postData.append('image', image, title);
        } else {
            postData = { id, title, content, imagePath: image, creator: null };
        }
        return this.httpClient.put(`${API_URL}/${id}`, postData);
    }

    deletePost(id: string) {
        return this.httpClient.delete(`${API_URL}/${id}`);
    }
}