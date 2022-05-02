import { Component, OnInit } from "@angular/core";
import { BookService } from "../../services/book.service";
import {Observable} from "rxjs/rx";
import {Book} from "../../models/book.type";
import {DateFormatter} from "ng2-bootstrap";
import {CharacterService} from "../../services/character.service";
import {resolve} from "systemjs";
import {Character} from "../../models/character.type";

@Component({
    selector: "book-page",
    templateUrl: "./book-page.component.html"
})
export class BookPageComponent implements OnInit {
    constructor(private bookService: BookService, private characterService: CharacterService ) {}

    books:Observable<Book[]>;
    selectedBook:Book;
    loading:boolean=true;

    ngOnInit() {
        this.getBooks();
        this.loading=false;
    }
    getBooks() {
        this.books = this.bookService.getBooks()
    }
    prettyDate(date:Date):string{
        return date.toString().substr(0,10);
    }

    characters:Character[]=[];
    selectBook(book:Book){
        this.selectedBook=book;
        this.characters=[];
        for(let i=0;i<5;++i){
            this.getCharacter(this.selectedBook.characters[i]).subscribe(it=>{
                this.characters.push(it);
            });
        }

    }
    getCharacters(){
        return Observable.of(this.characters);
    }

    getCharacter(id:string):Observable<Character>{
        return this.characterService.getCharacterById(id);
    }
}