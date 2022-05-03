import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import {Character} from "../models/character.type";
import {House} from "../models/house.type";

@Injectable()
export class HouseService {
    private houseUrl:string='https://www.anapioficeandfire.com/api/houses/';

    constructor(private http: Http) {}


    getHouses( pageNumber:number=1, pageSize:number=10):Observable<House[]>{
        return this.http.get(this.houseUrl+"?pageSize="+pageSize+"&page="+pageNumber).map(response => response.json());
    }

    getID(url:string):string{
        return Number.parseInt(url.split('/')[5]).toString();
    }

    getHouseById(url:string, id?:number):Observable<House>{
        if(typeof id!=="undefined")return this.http.get(this.houseUrl+id).map(response => response.json());
        else return this.http.get(this.houseUrl+this.getID(url)).map(response => response.json());
    }
}