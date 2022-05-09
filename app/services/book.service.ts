import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import {Book} from "../models/book.type";


@Injectable()
export class BookService {
    private books: Book[];
    private bookUrl:string='https://www.anapioficeandfire.com/api/books/';
    private hasCopy:boolean=false;

    constructor(private http: Http) {}

    /**
     * Az össes könyv lekérdezése a service-től. Ha korábban már lekérdezte, akkor a mentett tartalommal tér vissza.
     */
    getBooks():Observable<Book[]>{
        if(this.hasCopy) return Observable.of(this.books);
        let tmp=this.http.get(this.bookUrl).map(response => response.json());
        tmp.subscribe(it=>{
            this.books=it;
            this.hasCopy=true;
        });
        return tmp;
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
     * Könyv lekérdezése ID alapján
     * @param url Könyv URL-je
     * @param id Opcionálisan lekérdezhető ID alapján is.
     */
    getBookById(url:string, id?:number):Observable<Book>{
        if(typeof id!=="undefined")return this.http.get(this.bookUrl+id).map(response => response.json());
        else return this.http.get(this.bookUrl+this.getID(url)).map(response => response.json());
    }
}