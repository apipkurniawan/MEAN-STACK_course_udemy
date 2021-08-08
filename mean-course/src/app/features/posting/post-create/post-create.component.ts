import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MessageService } from 'primeng/api';

import { mimeType } from "./mime-type.validator";
import { PostWrapper } from 'src/app/models/post-wrapper.model';
import { PostService } from 'src/app/services/post.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
    // styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    post: PostWrapper;
    isLoading = false;
    uploadedFiles: any[] = [];
    image: any;
    form: FormGroup;

    private mode = 'create';
    private postId: string;

    constructor(
        public postService: PostService,
        private messageService: MessageService,
        public activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
            'content': new FormControl(null, { validators: [Validators.required] })
        });
        this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
            if (param.has('postId')) {
                this.mode = 'edit';
                this.postId = param.get('postId');
                this.isLoading = true;
                this.postService.getPostById(this.postId)
                    .subscribe(postData => {
                        this.post = {
                            id: postData._id,
                            title: postData.title,
                            content: postData.content,
                            imagePath: null
                        };
                        this.form.setValue({
                            title: this.post.title,
                            content: this.post.content
                        });
                        setTimeout(() => {
                            this.isLoading = false;
                        }, 1000);
                    });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onSaveData() {
        if (this.form.invalid) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Gagal simpan, Form tidak valid!'
            });
            return;
        }
        if (this.mode === 'create') {
            this.postService.addPost(this.form.value.title, this.form.value.content, this.image);
        } else {
            this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content);
        }
        this.form.reset();
    }

    setImage(event) {
        this.image = event.files[0];
    }
}
