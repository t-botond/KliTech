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
var router_1 = require("@angular/router");
var BookPageComponent = (function () {
    /**
     * Book komponens konstruktor
     * @param bookService Adatok lekérésére
     * @param route Kiválasztott könyv URL-ban való átadására
     * @param characterService A könyvben szereplők nevének a feloldására
     */
    function BookPageComponent(bookService, route, characterService) {
        this.bookService = bookService;
        this.route = route;
        this.characterService = characterService;
        this.loading = true;
        this.characters = [];
        this.povCharacters = [];
    }
    /**
     * Inicializáláskor betöltjük a könyvek listáját, és ha van, a kiválasztott könyvet.
     */
    BookPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getBooks();
        this.books.subscribe(function () {
            _this.loading = false;
        });
        this.route.params.subscribe(function (params) {
            var bookId = +params['id'];
            if (bookId) {
                _this.bookService.getBookById("", bookId).subscribe(function (it) {
                    _this.selectBook(it);
                });
            }
        });
    };
    /**
     * Egy bizonyos könyv kiválasztására
     * @param book A könyv, aminek a részleteit szeretnénk látni
     */
    BookPageComponent.prototype.selectBook = function (book) {
        var _this = this;
        this.selectedBook = book;
        this.characters = [];
        this.selectedBook.characters.forEach(function (it) {
            _this.characterService.getCharacterById(it).subscribe(function (it) {
                _this.characters.push(it);
                _this.characters.sort(function (a, b) { return _this.getCharacterName(a).localeCompare(_this.getCharacterName(b)); });
            });
        });
        this.povCharacters = [];
        this.selectedBook.povCharacters.forEach(function (it) {
            _this.characterService.getCharacterById(it).subscribe(function (it) {
                _this.povCharacters.push(it);
                _this.povCharacters.sort(function (a, b) { return _this.getCharacterName(a).localeCompare(_this.getCharacterName(b)); });
            });
        });
    };
    /**
     * Entitás ID-ját állítja elő
     * @param url Entitás URL-je
     */
    BookPageComponent.prototype.getID = function (url) {
        return Number.parseInt(url.split('/')[5]).toString();
    };
    /**
     * Könyvek listájának lekérdezése a service-ből
     */
    BookPageComponent.prototype.getBooks = function () {
        this.books = this.bookService.getBooks();
    };
    /**
     * Formázottan jeleníti meg a dátumot
     * @param date Dátum objektum amit meg szeretnénk jeleníteni.
     */
    BookPageComponent.prototype.prettyDate = function (date) {
        return date.toString().substr(0, 10);
    };
    /**
     * Karakter nevének lekérdezése. Ha nincs neve, visszatér az aliassal.
     * @param actor A karakter aminek a nevét le szeretnénk kérdezni.
     */
    BookPageComponent.prototype.getCharacterName = function (actor) {
        if (actor.name === "")
            return actor.aliases[0];
        return actor.name;
    };
    return BookPageComponent;
}());
BookPageComponent = __decorate([
    core_1.Component({
        selector: "book-page",
        templateUrl: "./book-page.component.html"
    }),
    __metadata("design:paramtypes", [book_service_1.BookService, router_1.ActivatedRoute, character_service_1.CharacterService])
], BookPageComponent);
exports.BookPageComponent = BookPageComponent;
//# sourceMappingURL=book-page.component.js.map