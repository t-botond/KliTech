import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ng2-bootstrap'

import { BookService } from "./services/book.service";
import { BookPageComponent } from "./components/book-page/book-page.component";
import { CharacterPageComponent } from "./components/character-page/character-page.component";
import { CharacterService } from "./services/character.service";
import { HousePageComponent } from "./components/house-page/house-page.component";
import { HouseService } from "./services/house.service";
import {GotAppComponent} from "./components/got-app/got-app.component";


let routes: Route[] = [
    { path: "houses", component: HousePageComponent },
    { path: "houses/:id", component: HousePageComponent },

    { path: "books", component: BookPageComponent },
    { path: "books/:id", component: BookPageComponent },

    { path: "character", component: CharacterPageComponent},
    { path: "character/:id", component: CharacterPageComponent},

];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpModule, CollapseModule.forRoot()],
    declarations: [GotAppComponent, HousePageComponent,BookPageComponent, CharacterPageComponent],
    exports: [],
    providers: [BookService, HouseService,CharacterService],
    bootstrap: [GotAppComponent]
})
export class GotAppModule { }
