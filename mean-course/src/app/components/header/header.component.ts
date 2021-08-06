import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
    //   styleUrls: ['./dashboard.component.css']
})
export class HeaderComponent implements OnInit {

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
