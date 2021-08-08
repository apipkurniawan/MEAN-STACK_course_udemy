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

    getPosts(postsPerPage: number, currentPage: number) {
        const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
        console.log('param ', queryParams);
        this.httpClient.get<{ message: string, posts: any }>(API_URL + queryParams)
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id,
                        imagePath: post.imagePath
                    };
                });
            }))
            .subscribe(transformedPost => {
                this.posts = transformedPost;
                this.postUpdated.next([...this.posts]);
            });
    }

    getPostById(id: string) {
        return this.httpClient.get<{ _id: string, title: string, content: string, imagePath: string }>(`${API_URL}/${id}`);
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
        // .subscribe(responseData => {
        //     const post: PostWrapper = {
        //         id: responseData.post.id,
        //         title,
        //         content,
        //         imagePath: responseData.post.imagePath
        //     };
        //     this.posts.push(post);
        //     this.postUpdated.next([...this.posts]);
        // });
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
            postData = { id, title, content, imagePath: image };
        }
        return this.httpClient.put(`${API_URL}/${id}`, postData);
        // .subscribe(response => {
        //     const updatedPosts = [...this.posts];
        //     const oldPostIndex = updatedPosts.findIndex(p => p.id == id);
        //     const post = { id, title, content, imagePath: response.imagePath };
        //     updatedPosts[oldPostIndex] = post;
        //     this.posts = updatedPosts;
        //     this.postUpdated.next([...this.posts]);
        // });
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