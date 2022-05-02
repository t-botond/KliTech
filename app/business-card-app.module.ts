import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ng2-bootstrap'
import { CompanyPageComponent } from "./components/company-page/company-page.component";
import { CardPageComponent } from "./components/card-page/card-page.component";
import { BusinessCardAppComponent } from "./components/business-card-app/business-card-app.component";
import { BookService } from "./services/book.service";
import { CompanyService } from "./services/company.service";
import {BookPageComponent} from "./components/book-page/book-page.component";
import {CharacterService} from "./services/character.service";

let routes: Route[] = [
    { path: "companies", component: CompanyPageComponent },
    { path: "cards", component: CardPageComponent },
    { path: "companies/:id", component: CompanyPageComponent },
    { path: "cards/:id", component: CardPageComponent },

    { path: "books", component: BookPageComponent },

];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpModule, CollapseModule.forRoot()],
    declarations: [BusinessCardAppComponent, CompanyPageComponent, CardPageComponent,BookPageComponent],
    exports: [],
    providers: [BookService, CompanyService,CharacterService],
    bootstrap: [BusinessCardAppComponent]
})
export class BusinessCardAppModule { }
