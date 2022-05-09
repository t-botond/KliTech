"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var book_service_1 = require("./services/book.service");
var book_page_component_1 = require("./components/book-page/book-page.component");
var character_page_component_1 = require("./components/character-page/character-page.component");
var character_service_1 = require("./services/character.service");
var house_page_component_1 = require("./components/house-page/house-page.component");
var house_service_1 = require("./services/house.service");
var got_app_component_1 = require("./components/got-app/got-app.component");
var routes = [
    { path: "houses", component: house_page_component_1.HousePageComponent },
    { path: "houses/:id", component: house_page_component_1.HousePageComponent },
    { path: "books", component: book_page_component_1.BookPageComponent },
    { path: "books/:id", component: book_page_component_1.BookPageComponent },
    { path: "character", component: character_page_component_1.CharacterPageComponent },
    { path: "character/:id", component: character_page_component_1.CharacterPageComponent },
];
var GotAppModule = (function () {
    function GotAppModule() {
    }
    return GotAppModule;
}());
GotAppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(routes), forms_1.FormsModule, http_1.HttpModule, ng2_bootstrap_1.CollapseModule.forRoot()],
        declarations: [got_app_component_1.GotAppComponent, house_page_component_1.HousePageComponent, book_page_component_1.BookPageComponent, character_page_component_1.CharacterPageComponent],
        exports: [],
        providers: [book_service_1.BookService, house_service_1.HouseService, character_service_1.CharacterService],
        bootstrap: [got_app_component_1.GotAppComponent]
    })
], GotAppModule);
exports.GotAppModule = GotAppModule;
//# sourceMappingURL=got-app.module.js.map