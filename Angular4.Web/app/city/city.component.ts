import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { Constants } from '../shared/commons';
import { AlertService } from '../core/alert.service';
import { City } from './city.model';
import { CityService } from './city.service';

@Component({
    moduleId: module.id,
    selector: 'app-city',
    templateUrl: './city.component.html'
})

export class CityComponent {
    @Input() city: City;
    @Output() onSelected = new EventEmitter<City>();
    public cities: City[];
    public focus = false;

    constructor(private cityService: CityService, private alertService: AlertService, private translateService: TranslateService) {}

    public Search(query: string) {
        this.cityService.Search(query).subscribe(
            (data: City[]) => {
                this.cities = data;
            }
        );
    }

    public Focus() {
        this.city = { Id: Constants.guidEmpty, Name: '', IdDistrict: Constants.guidEmpty };
        this.focus = true;
        this.onSelected.emit(this.city);
    }

    public Select(city: City) {
        this.city = city;
        this.focus = false;
        this.onSelected.emit(this.city);
        this.cities = null;
    }
}
