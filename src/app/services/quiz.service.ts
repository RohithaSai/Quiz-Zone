import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class QuizService {

  constructor(private http: Http) { }

  get(url: string) {
    return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  }

  getAll() {
    return [
      { id: '', name: 'Select' },
      { id: 'assets/aptitude.json', name: 'Aptitude' },
      { id: 'assets/generalknowledge.json', name: 'General Knowledge' },
      { id: 'assets/programming.json', name: 'Programming' },
      { id: 'assets/verbal.json', name: 'Verbal' }
    ];
  }

}
