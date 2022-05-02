import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/rx";
import { Card } from "../../models/card.type";
import { BookService } from "../../services/book.service";
import { SearchResult } from "../../models/search-result.type";
import { CompanyService } from "../../services/company.service";
import { Company } from "../../models/company.type";
import * as _ from "lodash";

@Component({
    selector: "card-page",
    templateUrl: "./card-page.component.html"
})
export class CardPageComponent implements OnInit {
    constructor(private cardService: BookService) { }
    ngOnInit() {

    }
}