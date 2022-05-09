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
var http_1 = require("@angular/http");
var CharacterService = (function () {
    function CharacterService(http) {
        this.http = http;
        this.characterUrl = 'https://www.anapioficeandfire.com/api/characters/';
    }
    /**
     * Karakterek listájának lekérdezése az API-tól
     * @param pageNumber Oldalszám
     * @param pageSize Oldalon megjelenő entitások száma
     */
    CharacterService.prototype.getCharacters = function (pageNumber, pageSize) {
        if (pageNumber === void 0) { pageNumber = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        return this.http.get(this.characterUrl + "?pageSize=" + pageSize + "&page=" + pageNumber).map(function (response) { return response.json(); });
    };
    /**
     * Entitás azonosítóját állítja elő.
     * @param url Entitás címe.
     */
    CharacterService.prototype.getID = function (url) {
        if (typeof url === "undefined")
            return "";
        return Number.parseInt(url.split('/')[5]).toString();
    };
    /**
     * Karakter lekérdezése ID alapján
     * @param url Karakter URL-je
     * @param id Opcionálisan lekérdezhető ID alapján is.
     */
    CharacterService.prototype.getCharacterById = function (url, id) {
        if (typeof id !== "undefined")
            return this.http.get(this.characterUrl + id).map(function (response) { return response.json(); });
        else
            return this.http.get(this.characterUrl + this.getID(url)).map(function (response) { return response.json(); });
    };
    return CharacterService;
}());
CharacterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CharacterService);
exports.CharacterService = CharacterService;
//# sourceMappingURL=character.service.js.map