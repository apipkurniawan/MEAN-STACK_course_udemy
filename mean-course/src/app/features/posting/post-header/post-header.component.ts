import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-post-header',
    templateUrl: './post-header.component.html'
    //   styleUrls: ['./post-header.component.css']
})
export class PostHeaderComponent implements OnInit {

    items: MenuItem[];

    constructor(
        private router: Router
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

    showLogin() {
        this.router.navigate(['/login']);
    }

}
