import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import {Character} from "../models/character.type";
import {forEach} from "lodash";
import {observable} from "rxjs/symbol/observable";
import {concatStatic} from "rxjs/operator/concat";

@Injectable()
export class CharacterService {
    private characters: Character[];
    private characterUrl:string='https://www.anapioficeandfire.com/api/characters/';


    constructor(private http: Http) {}


    getCharacters():Observable<Character[]>{
        return Observable.of(this.characters);
    }

    getCharacterID(url:string):string{
        return Number.parseInt(url.split('/')[5]).toString();
    }

    getCharacterById(character:string):Observable<Character>{
        return this.http.get(this.characterUrl+this.getCharacterID(character)).map(response => response.json());
    }


    private load() {
        let ls=JSON.parse(localStorage.getItem('characters'));
        if(ls){
            this.characters=ls;
        }else{
            this.http.get(this.characterUrl+"?pageSize=50").map(response => response.json()).subscribe(it=>{
                this.characters=it;
                this.save();
            });
        }
    }

    private save() {
        localStorage.setItem('characters', JSON.stringify(this.characters));
    }
}