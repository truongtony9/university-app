import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { take } from 'rxjs/operators';
import { CountriesListModel } from './app.model';

import { UniversityService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent {

  expandedElement: any | null | undefined;
  selectedCountryData: any = [];

  displayedColumns: string[] = ['name'];
  countries: CountriesListModel[] = [ {name: 'United States'}, {name: 'Canada'}, {name: 'England'}];
  countriesControl = new FormControl('', Validators.required);

  constructor(
    private universityService: UniversityService
  ) {}

  onCountryChange(): void {
    let query = this.getCountryStringQuery(this.countriesControl.value.name);
    this.getCountriesQuery(query);
  }

  getCountryStringQuery(countryName: string): string {
    switch (countryName) {
      case 'United States':
        return 'United%20States';
      case 'Canada':
        return 'Canada';
      case 'England':
        return 'United%20Kingdom';
      default:
        return 'United%20States';
    }
  }

  getCountriesQuery(query: string) {
    let resolvedData: any;
    this.universityService.getUniversitiesQuery(query).pipe(take(1)).subscribe({
      next: result => resolvedData = result,
      error: () => {},
      complete: () => {
        this.selectedCountryData = resolvedData;
      }
    })
  }
}
