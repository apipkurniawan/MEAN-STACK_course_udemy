import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostWrapper } from './../../../models/post-wrapper.model';
@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
    // styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    postDesk: string;
    postTitle: string;
    @Output() postCreated = new EventEmitter<PostWrapper>();

    constructor() { }

    ngOnInit(): void { }

    onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const post: PostWrapper = {
            title: form.value.title,
            content: form.value.deskripsi
        };
        this.postCreated.emit(post);
        form.onReset();
    }
}
