import { Injectable } from '@angular/core';
import { PostWrapper } from './../models/post-wrapper.model';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: PostWrapper[] = [];
    private postUpdated = new Subject<PostWrapper[]>();

    getPosts() {
        return [...this.posts];
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: PostWrapper = { title, content };
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
    }
}