import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-post-header',
    templateUrl: './post-header.component.html',
    styleUrls: ['./post-header.component.css']
})
export class PostHeaderComponent implements OnInit, OnDestroy {

    items: MenuItem[];
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.setItemsNavbar();
        this.authListenerSubs = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                this.handleNavbar(['New Post'], this.userIsAuthenticated);
            });
    }

    ngOnDestroy() {
        this.authListenerSubs.unsubscribe();
    }

    setItemsNavbar() {
        this.items = [
            {
                label: 'My Messages',
                icon: 'pi pi-fw pi-envelope',
                routerLink: '/'
            },
            {
                label: 'New Post',
                icon: 'pi pi-fw pi-pencil',
                routerLink: '/post-create',
                visible: this.userIsAuthenticated
            }
        ];
        console.log('setItems ', this.items);
    }

    handleNavbar(labels: string[], isAuth: boolean) {
        this.items = this.items.map(e => {
            if (labels.includes(e.label)) {
                e.visible = isAuth;
            }
            return e;
        });
        console.log('handleItems ', this.items);
    }

    onLogIn() {
        this.router.navigate(['/login']);
    }

    onLogOut() {
        this.authService.logout();
    }

    showSignUp() {
        this.router.navigate(['/signup']);
    }

}
