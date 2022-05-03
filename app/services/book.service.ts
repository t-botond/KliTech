import { Injectable } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Http } from '@angular/http';
import {Book} from "../models/book.type";
import {connectableObservableDescriptor} from "rxjs/observable/ConnectableObservable";

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



/*
    private load() {
        let ls=JSON.parse(localStorage.getItem('books'));
        if(ls != null && ls.length>0){
            this.books=ls;
            console.log("Local storage books is not empty");
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
 */
}