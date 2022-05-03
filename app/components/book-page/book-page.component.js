"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var book_service_1 = require("../../services/book.service");
var character_service_1 = require("../../services/character.service");
var BookPageComponent = (function () {
    function BookPageComponent(bookService, characterService) {
        this.bookService = bookService;
        this.characterService = characterService;
        this.loading = true;
        this.characters = [];
        this.povCharacters = [];
    }
    BookPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getBooks();
        this.books.subscribe(function (it) {
            _this.loading = false;
            console.log("Loading is done");
        });
    };
    BookPageComponent.prototype.selectBook = function (book) {
        var _this = this;
        this.selectedBook = book;
        this.characters = [];
        this.selectedBook.characters.forEach(function (it) {
            _this.characterService.getCharacterById(it).subscribe(function (it) {
                _this.characters.push(it);
            });
        });
        this.povCharacters = [];
        this.selectedBook.povCharacters.forEach(function (it) {
            _this.characterService.getCharacterById(it).subscribe(function (it) {
                _this.povCharacters.push(it);
            });
        });
    };
    BookPageComponent.prototype.getCharacterID = function (url) {
        return Number.parseInt(url.split('/')[5]).toString();
    };
    BookPageComponent.prototype.getBooks = function () {
        this.books = this.bookService.getBooks();
    };
    BookPageComponent.prototype.prettyDate = function (date) {
        return date.toString().substr(0, 10);
    };
    BookPageComponent.prototype.getCharacterName = function (c) {
        if (c.name === "")
            return c.aliases[0];
        return c.name;
    };
    return BookPageComponent;
}());
BookPageComponent = __decorate([
    core_1.Component({
        selector: "book-page",
        templateUrl: "./book-page.component.html"
    }),
    __metadata("design:paramtypes", [book_service_1.BookService, character_service_1.CharacterService])
], BookPageComponent);
exports.BookPageComponent = BookPageComponent;
//# sourceMappingURL=book-page.component.js.map