import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from "rxjs/rx";

@Component({
    selector: 'business-card-app',
    templateUrl: './got-app.component.html'
})
export class GotAppComponent implements OnInit {

    /**
     * Főoldal konstrukora
     * @param router Routok kezelése
     */
    constructor(private router: Router) { }
    ngOnInit() {
        this.currentPageTitle = this.router.events
            .filter(e => e instanceof NavigationEnd)
            .map((() => _.find(["Character", "Houses","Books"], t => this.router.isActive('/' + t.toLowerCase(), false))).bind(this));

    }
    
    title = "GOT Wiki";
    isNavbarCollapsed = true;
    currentPageTitle: Observable<string>;
}