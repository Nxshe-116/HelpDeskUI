import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ConfirmDialogService} from '../../services/confirm-dialog.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
     loggedInUser: string;
     userIsLoggedIn: boolean;

    constructor(location: Location,
                private element: ElementRef,
                private router: Router,
                private confirmDialogService: ConfirmDialogService,
                private _router: Router) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            const $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });

        this.getLoggedInUser();

    }

    getLoggedInUser() {
        if (localStorage.getItem('loggedInUser') != null) {
            // console.log('ZIta riri mu session iri', sessionStorage.getItem('username'));
            this.loggedInUser = localStorage.getItem('loggedInUser');
            this.userIsLoggedIn = true;
        } else {
            console.log('No one is logged in');
        }
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible === 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            // tslint:disable-next-line:prefer-const
            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { // assign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        let title = this.location.prepareExternalUrl(this.location.path());
        if (title.charAt(0) === '#') {
            title = title.slice(1);
        }

        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === title) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    logoutUser() {


        this.confirmDialogService.openConfirmDialog('Hie ' + sessionStorage.getItem('loggedInUser') + '. Are you sure you want to log out?')
            .afterClosed().subscribe(res => {
                if (res) { // If a user selects yes then we get true, and we proceed with deleting
                    // sessionStorage.removeItem('loggedInUser');
                    // sessionStorage.removeItem('loggedInUserId');
                    sessionStorage.clear();
                    localStorage.clear();
                    window.location.reload();
                    this._router.navigateByUrl('/log-in');
                }
            },
            error => {
            },
            () => {
                 return this._router.navigateByUrl('/log-in');
            });


    }
}
