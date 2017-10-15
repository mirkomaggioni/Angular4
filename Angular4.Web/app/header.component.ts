import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from './core/search.service';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
    searchText = '';

    constructor (private searchService: SearchService) {}

    ngOnInit() {
        this.searchService.onResetted.subscribe((searchText: string) => {
           if (searchText === '') {
               this.searchText = searchText;
           }
        });
    }

    public Search() {
        this.searchService.searchText = this.searchText;
    }
}
