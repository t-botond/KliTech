import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Card } from "../models/card.type";
import { Http } from '@angular/http';
import {Book} from "../models/book.type";

@Injectable()
export class Book_Service {
    private books: Book[];
    private bookUrl:string='https://www.anapioficeandfire.com/api/books/';

    constructor(private http: Http) {
        this.getBooks();
        this.getBookById(3).subscribe(it=>{console.log(it)});
    }


    getBooks():Observable<Book[]>{
        return this.http.get(this.bookUrl).map(response => response.json());
    }

    getBookById(id:number):Observable<Book>{
        return this.http.get(this.bookUrl+id).map(response => response.json());
    }


}