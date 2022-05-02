import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from "rxjs/rx";
import { BookService } from "../../services/book.service";
import {Book} from "../../models/book.type";
import { Card } from "../../models/card.type";

@Component({
    selector: 'business-card-app',
    templateUrl: './business-card-app.component.html'
})
export class BusinessCardAppComponent implements OnInit {
    constructor(private router: Router) { }
    ngOnInit() {
        this.currentPageTitle = this.router.events
            .filter(e => e instanceof NavigationEnd)
            .map((() => _.find(["Cards", "Companies","Books"], t => this.router.isActive('/' + t.toLowerCase(), false))).bind(this))
    }
    
    title = "GOT Wiki";
    isNavbarCollapsed = true;
    currentPageTitle: Observable<string>;
}