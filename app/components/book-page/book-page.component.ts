import { Component, OnInit } from "@angular/core";
import { BookService } from "../../services/book.service";
import {Observable} from "rxjs/rx";
import {Book} from "../../models/book.type";
import {CharacterService} from "../../services/character.service";
import {Character} from "../../models/character.type";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "book-page",
    templateUrl: "./book-page.component.html"
})
export class BookPageComponent implements OnInit {
    books:Observable<Book[]>;
    selectedBook:Book;
    loading:boolean=true;
    characters:Character[]=[];
    povCharacters:Character[]=[];

    /**
     * 
     * @param bookService
     * @param route
     * @param characterService
     */
    constructor(private bookService: BookService, private route: ActivatedRoute, private characterService: CharacterService ) {}

    /**
     *
     */
    ngOnInit() {
        this.getBooks();
        this.books.subscribe(()=>{
            this.loading=false;
        });

        this.route.params.subscribe(params => {
            let bookId = +params['id'];
            if(bookId){
                this.bookService.getBookById("", bookId).subscribe(it=>{
                    this.selectBook(it);
                });
            }
        });
    }

    /**
     *
     * @param book
     */
    selectBook(book:Book){
        this.selectedBook=book;
        this.characters=[];
        this.selectedBook.characters.forEach(it=>{
            this.characterService.getCharacterById(it).subscribe(it=>{
                this.characters.push(it);
                this.characters.sort((a:Character, b:Character)=>this.getCharacterName(a).localeCompare(this.getCharacterName(b)));
            });
        });
        this.povCharacters=[];
        this.selectedBook.povCharacters.forEach(it=>{
            this.characterService.getCharacterById(it).subscribe(it=>{
                this.povCharacters.push(it);
                this.povCharacters.sort((a:Character, b:Character)=>this.getCharacterName(a).localeCompare(this.getCharacterName(b)));
            });
        });
    }

    /**
     *
     * @param url
     */
    getID(url:string):string{
        return Number.parseInt(url.split('/')[5]).toString();
    }

    /**
     *
     */
    getBooks() {
        this.books = this.bookService.getBooks()
    }

    /**
     *
     * @param date
     */
    prettyDate(date:Date):string{
        return date.toString().substr(0,10);
    }

    /**
     *
     * @param c
     */
    getCharacterName(c:Character):string{
        if(c.name==="") return c.aliases[0];
        return c.name;
    }

}