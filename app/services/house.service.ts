import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import {House} from "../models/house.type";

@Injectable()
export class HouseService {
    private houseUrl:string='https://www.anapioficeandfire.com/api/houses/';

    constructor(private http: Http) {}

    /**
     * Házak listájának lekérdezése az API-tól
     * @param pageNumber Oldalszám
     * @param pageSize Oldalon megjelenő entitások száma
     */
    getHouses( pageNumber:number=1, pageSize:number=10):Observable<House[]>{
        return this.http.get(this.houseUrl+"?pageSize="+pageSize+"&page="+pageNumber).map(response => response.json());
    }

    /**
     * Entitás azonosítóját állítja elő.
     * @param url Entitás címe.
     */
    getID(url:string):string{
        if(typeof url==="undefined")return "";
        return Number.parseInt(url.split('/')[5]).toString();
    }
    /**
     * Ház lekérdezése ID alapján
     * @param url Ház URL-je
     * @param id Opcionálisan lekérdezhető ID alapján is.
     */
    getHouseById(url:string, id?:number):Observable<House>{
        if(typeof id!=="undefined")return this.http.get(this.houseUrl+id).map(response => response.json());
        else return this.http.get(this.houseUrl+this.getID(url)).map(response => response.json());
    }
}