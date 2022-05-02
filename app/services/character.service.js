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
var CharacterService = (function () {
    function CharacterService(http) {
        this.http = http;
        this.characterUrl = 'https://www.anapioficeandfire.com/api/characters/';
        this.load();
    }
    CharacterService.prototype.getCharacters = function () {
        return rx_1.Observable.of(this.characters);
    };
    CharacterService.prototype.getCharacterID = function (url) {
        return Number.parseInt(url.split('/')[5]);
    };
    CharacterService.prototype.getCharacterById = function (id) {
        var _this = this;
        var local = this.characters.find(function (it) { return it.url == id; });
        if (typeof local !== "undefined") {
            return rx_1.Observable.of(local);
        }
        else {
            var justLoaded = this.http.get(this.characterUrl + this.getCharacterID(id)).map(function (response) { return response.json(); });
            justLoaded.subscribe(function (it) {
                _this.characters.push(it);
                _this.save();
            });
            return justLoaded;
        }
    };
    CharacterService.prototype.load = function () {
        var _this = this;
        var ls = JSON.parse(localStorage.getItem('characters'));
        if (ls) {
            this.characters = ls;
        }
        else {
            this.http.get(this.characterUrl + "?pageSize=50").map(function (response) { return response.json(); }).subscribe(function (it) {
                _this.characters = it;
                _this.save();
            });
        }
    };
    CharacterService.prototype.save = function () {
        localStorage.setItem('characters', JSON.stringify(this.characters));
    };
    return CharacterService;
}());
CharacterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CharacterService);
exports.CharacterService = CharacterService;
//# sourceMappingURL=character.service.js.map