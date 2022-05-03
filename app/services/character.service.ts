import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import {Character} from "../models/character.type";

@Injectable()
export class CharacterService {
    private characterUrl:string='https://www.anapioficeandfire.com/api/characters/';


    constructor(private http: Http) {}


    getCharacters( pageNumber:number=1, pageSize:number=10):Observable<Character[]>{
        return this.http.get(this.characterUrl+"?pageSize="+pageSize+"&page="+pageNumber).map(response => response.json());
    }

    getCharacterID(url:string):string{
        return Number.parseInt(url.split('/')[5]).toString();
    }

    getCharacterById(url:string, id?:number):Observable<Character>{
        if(typeof id!=="undefined")return this.http.get(this.characterUrl+id).map(response => response.json());
        else return this.http.get(this.characterUrl+this.getCharacterID(url)).map(response => response.json());
    }
}