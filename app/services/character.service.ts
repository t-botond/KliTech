import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import {Character} from "../models/character.type";

@Injectable()
export class CharacterService {
    private characters: Character[];
    private characterUrl:string='https://www.anapioficeandfire.com/api/characters/';

    constructor(private http: Http) {
        this.load();
    }


    getCharacters():Observable<Character[]>{
        return Observable.of(this.characters);
    }


    getCharacterID(url:string){
        return Number.parseInt(url.split('/')[5]);

    }
    getCharacterById(id:string):Observable<Character>{
        let local=this.characters.find(it=>it.url==id);
        if(typeof local!=="undefined"){
            return Observable.of(local);
        }else{
            let justLoaded= this.http.get(this.characterUrl+this.getCharacterID(id)).map(response => response.json());
            justLoaded.subscribe(it=>{
                this.characters.push(it);
                this.save();
            });
            return justLoaded;
        }
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