import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import {Book} from "../models/book.type";
import {Character} from "../models/character.type";


@Injectable()
export class BookService {
    private books: Book[];
    private bookUrl:string='https://www.anapioficeandfire.com/api/books/';
    private hasCopy:boolean=false;

    constructor(private http: Http) {
    }


    getBooks():Observable<Book[]>{
        if(this.hasCopy) return Observable.of(this.books);
        let tmp=this.http.get(this.bookUrl).map(response => response.json());
        tmp.subscribe(it=>{
            this.books=it;
            this.hasCopy=true;
        });
        return tmp;
    }
    getBookID(url:string):string{
        return Number.parseInt(url.split('/')[5]).toString();
    }

    getBookById(url:string, id?:number):Observable<Book>{
        if(typeof id!=="undefined")return this.http.get(this.bookUrl+id).map(response => response.json());
        else return this.http.get(this.bookUrl+this.getBookID(url)).map(response => response.json());
    }
}