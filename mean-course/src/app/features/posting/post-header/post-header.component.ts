import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-post-header',
    templateUrl: './post-header.component.html'
    //   styleUrls: ['./post-header.component.css']
})
export class PostHeaderComponent implements OnInit {

    items: MenuItem[];

    constructor(
    ) { }

    ngOnInit(): void {
        this.items = [
            {
                label: 'My Messages',
            },
            {
                label: 'New Post',
            }
        ];
    }

}
