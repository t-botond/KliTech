import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import {Book} from "../models/book.type";

@Injectable()
export class BookService {
    private books: Book[];
    private bookUrl:string='https://www.anapioficeandfire.com/api/books/';

    constructor(private http: Http) {
        this.load();
    }


    getBooks():Observable<Book[]>{
        return Observable.of(this.books);
    }


    private load() {
        let ls=JSON.parse(localStorage.getItem('books'));
        if(ls){
            this.books=ls;
        }else{
            this.http.get(this.bookUrl).map(response => response.json()).subscribe(it=>{
                this.books=it;
                this.save()
            });
        }
    }

    private save() {
        localStorage.setItem('books', JSON.stringify(this.books));
    }
}