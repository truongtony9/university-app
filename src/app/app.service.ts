import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root',
})

export class UniversityService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getUniversitiesQuery(countryName: string): Observable<any> {
    return this.httpClient.get<any>(`http://universities.hipolabs.com/search?country=${countryName}`)
  }
}