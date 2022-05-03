import { Component, OnInit } from "@angular/core";
import { BookService } from "../../services/book.service";
import {Observable} from "rxjs/rx";
import {Book} from "../../models/book.type";
import {DateFormatter} from "ng2-bootstrap";
import {CharacterService} from "../../services/character.service";
import {resolve} from "systemjs";
import {Character} from "../../models/character.type";
import {forEach} from "lodash";

@Component({
    selector: "book-page",
    templateUrl: "./book-page.component.html"
})
export class BookPageComponent implements OnInit {
    constructor(private bookService: BookService, private characterService: CharacterService ) {}

    books:Observable<Book[]>;
    selectedBook:Book;
    loading:boolean=true;

    characters:Character[]=[];
    povCharacters:Character[]=[];

    ngOnInit() {
        this.getBooks();
        this.books.subscribe(it=>{
            this.loading=false;
            console.log("Loading is done");
        });
    }

    selectBook(book:Book){
        this.selectedBook=book;
        this.characters=[];
        this.selectedBook.characters.forEach(it=>{
            this.characterService.getCharacterById(it).subscribe(it=>{
                this.characters.push(it);
            });
        });
        this.povCharacters=[];
        this.selectedBook.povCharacters.forEach(it=>{
            this.characterService.getCharacterById(it).subscribe(it=>{
                this.povCharacters.push(it);
            });
        });
    }

    getCharacterID(url:string):string{
        return Number.parseInt(url.split('/')[5]).toString();
    }

    getBooks() {
        this.books = this.bookService.getBooks()
    }

    prettyDate(date:Date):string{
        return date.toString().substr(0,10);
    }

    getCharacterName(c:Character):string{
        if(c.name==="") return c.aliases[0];
        return c.name;
    }

}