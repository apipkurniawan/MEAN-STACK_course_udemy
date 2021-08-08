import { PostWrapper } from 'src/app/models/post-wrapper.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
    // styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    postDesk: string;
    postTitle: string;
    post: PostWrapper;
    isLoading = false;
    uploadedFiles: any[] = [];

    private mode = 'create';
    private postId: string;

    constructor(
        public postService: PostService,
        public activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
            if (param.has('postId')) {
                this.mode = 'edit';
                this.postId = param.get('postId');
                this.isLoading = true;
                this.postService.getPostById(this.postId)
                    .subscribe(postData => {
                        this.post = { id: postData._id, title: postData.title, content: postData.content };
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

    onSavePost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        if (this.mode === 'create') {
            this.postService.addPost(form.value.title, form.value.deskripsi);
        } else {
            this.postService.updatePost(this.postId, form.value.title, form.value.deskripsi);
        }
        form.resetForm();
    }

    onUpload(e) {

    }
}
