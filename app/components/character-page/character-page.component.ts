import { Component, OnInit } from "@angular/core";
import { BookService } from "../../services/book.service";
import {CharacterService} from "../../services/character.service";
import {Character} from "../../models/character.type";
import { ActivatedRoute } from "@angular/router";
import {Book} from "../../models/book.type";
import {HouseService} from "../../services/house.service";
import {House} from "../../models/house.type";

@Component({
    selector: "character-page",
    templateUrl: "./character-page.component.html"
})
export class CharacterPageComponent implements OnInit {
    father:Character;
    mother:Character;
    spouse:Character;
    books:Book[]=[];
    povBooks:Book[]=[];
    allegiances:House[]=[];
    maxPages:number=215;
    characters:Character[];
    selectedCharacter:Character;
    currentPage:number=1;

    /**
     * CharacterPageComponent konstruktor dependencia injektálással.
     * @param characterService Karakter lekérdezésekre
     * @param route Routing feladatok
     * @param bookService Könyvek lekérdezésére
     * @param houseService Házak lekérdezésére
     */
    constructor(private characterService: CharacterService, private route: ActivatedRoute, private  bookService:BookService, private houseService:HouseService) { }

    /**
     * Komponens inicializálsa
     * Betöltjük az első 10 karaktert, és megjelenítjük, ha van kért karakter.
     */
    ngOnInit() {
        this.getCharacters();
        this.route.params.subscribe(params => {
            let characterId = +params['id'];
            if(characterId){
                this.characterService.getCharacterById("",characterId).subscribe(it => {
                    this.modCharacter(it);
                });
            }
        });
    }

    /**
     * A characterService-től lekérdezi alapértelmezés szerint az első 10 karaktert
     * @param pageNumber Lekérdezni kívánt oldal
     * @param pageSize Az oldalon megjelenő karakterek száma (max 50)
     */
    getCharacters(pageNumber:number=1, pageSize:number=10) {
        this.characterService.getCharacters(pageNumber, pageSize).subscribe(it => {
            this.characters=it;
        });
    }

    /**
     * Az aktuálisan kiválaszott karakter módosítása
     * @param c kiválasztott karakter
     */
    modCharacter(c:Character){
        this.selectedCharacter=c;
        this.father=undefined;
        if(this.selectedCharacter.father.length>0){
            this.characterService.getCharacterById(this.selectedCharacter.father).subscribe(it=>{
                this.father=it;
            });
        }

        this.mother=undefined;
        if(this.selectedCharacter.mother.length>0){
            this.characterService.getCharacterById(this.selectedCharacter.mother).subscribe(it=>{
                this.mother=it;
            });
        }

        this.spouse=undefined;
        if(this.selectedCharacter.spouse.length>0){
            this.characterService.getCharacterById(this.selectedCharacter.spouse).subscribe(it=>{
                this.spouse=it;
            });
        }


        this.books=[];
        if(this.selectedCharacter.books.length>0){
            this.selectedCharacter.books.forEach(it=>{
                this.bookService.getBookById(it).subscribe(item=>{
                   this.books.push(item);
                });
            });
        }
        this.povBooks=[];
        if(this.selectedCharacter.povBooks.length>0){
            this.selectedCharacter.povBooks.forEach(it=>{
                this.bookService.getBookById(it).subscribe(item=>{
                    this.povBooks.push(item);
                });
            });
        }
        this.allegiances=[];
        if(this.selectedCharacter.allegiances.length>0){
            this.selectedCharacter.allegiances.forEach(it=>{
                this.houseService.getHouseById(it).subscribe(item=>{
                    this.allegiances.push(item);
                });
            });
        }
    }

    /**
     * Karakter nevének lekérdezése. Ha nincs neve, visszatér az aliassal.
     * @param actor A karakter aminek a nevét le szeretnénk kérdezni.
     */
    getCharacterName(actor:Character):string{
        if(typeof actor === "undefined") return "";
        if(actor.name==="") return actor.aliases[0];
        return actor.name;
    }

    /**
     * Entitás azonosítójának lekérdezése.
     * @param url Entitás URL-je.
     */
    getID(url:string):string{
        return Number.parseInt(url.split('/')[5]).toString();
    }

}