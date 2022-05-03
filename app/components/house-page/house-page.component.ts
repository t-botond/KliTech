import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { BookService } from "../../services/book.service";
import {CharacterService} from "../../services/character.service";
import {Character} from "../../models/character.type";
import { ActivatedRoute } from "@angular/router";
import {Book} from "../../models/book.type";
import {HouseService} from "../../services/house.service";
import {House} from "../../models/house.type";

@Component({
    selector: "house-page",
    templateUrl: "./house-page.component.html"
})
export class HousePageComponent implements OnInit {
    constructor(private houseService: HouseService, private route: ActivatedRoute, private characterService:CharacterService) { }

    maxPages:number=46;
    houses:House[];
    selectedHouse:House;
    currentPage:number=1;

    ngOnInit() {
        this.getHouses();
        this.route.params.subscribe(params => {
            let houseId = +params['id'];
            if(houseId){
                this.houseService.getHouseById("",houseId).subscribe(it=>{
                    this.modHouse(it);
                });
            }
        });
    }

    getHouses(pageNumber:number=1, pageSize:number=10) {
        this.houseService.getHouses(pageNumber, pageSize).subscribe(it => {
            this.houses=it;
        });
    }

    currentLord:Character;
    heir:Character;
    founder:Character;
    overlord:House;
    cadetBranches:House[]=[];
    swornMembers:Character[]=[];

    modHouse(house:House){
        this.selectedHouse=house;

        this.currentLord=undefined;
        if(this.selectedHouse.currentLord.length>0){
            this.characterService.getCharacterById(this.selectedHouse.currentLord).subscribe(it=>{
                this.currentLord=it;
            });
        }
        this.heir=undefined;
        if(this.selectedHouse.heir.length>0){
            this.characterService.getCharacterById(this.selectedHouse.heir).subscribe(it=>{
                this.heir=it;
            });
        }
        this.founder=undefined;
        if(this.selectedHouse.founder.length>0){
            this.characterService.getCharacterById(this.selectedHouse.founder).subscribe(it=>{
                this.founder=it;
            });
        }
        this.overlord=undefined;
        if(this.selectedHouse.overlord.length>0){
            this.houseService.getHouseById(this.selectedHouse.overlord).subscribe(it=>{
                this.overlord=it;
            });
        }
        this.cadetBranches=[];
        if(this.selectedHouse.cadetBranches.length>0){
            this.selectedHouse.cadetBranches.forEach(it=>{
                this.houseService.getHouseById(it).subscribe(item=>{
                    this.cadetBranches.push(item);
                });
            });
        }
        this.swornMembers=[];
        if(this.selectedHouse.swornMembers.length>0){
            this.selectedHouse.swornMembers.forEach(it=>{
                this.characterService.getCharacterById(it).subscribe(item=>{
                    this.swornMembers.push(item);
                });
            });
        }
    }


    getID(url:string):string{
        if(typeof url==="undefined")return "";
        return Number.parseInt(url.split('/')[5]).toString();
    }
    getCharacterName(c:Character):string{
        if(typeof c ==="undefined") return ;
        if(c.name==="") return c.aliases[0];
        return c.name;
    }

}