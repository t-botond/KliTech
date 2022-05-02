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
var rx_1 = require("rxjs/rx");
var http_1 = require("@angular/http");
var BookService = (function () {
    function BookService(http) {
        this.http = http;
        this.bookUrl = 'https://www.anapioficeandfire.com/api/books/';
        this.load();
    }
    BookService.prototype.getBooks = function () {
        return rx_1.Observable.of(this.books);
    };
    BookService.prototype.load = function () {
        var _this = this;
        var ls = JSON.parse(localStorage.getItem('books'));
        if (ls) {
            this.books = ls;
        }
        else {
            this.http.get(this.bookUrl).map(function (response) { return response.json(); }).subscribe(function (it) {
                _this.books = it;
                _this.save();
            });
        }
    };
    BookService.prototype.save = function () {
        localStorage.setItem('books', JSON.stringify(this.books));
    };
    return BookService;
}());
BookService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map