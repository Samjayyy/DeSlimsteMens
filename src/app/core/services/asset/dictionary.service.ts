import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DictionaryService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<string[]> {
    return this.http
      .get<string[]>('./assets/dictionary-nl.json');
  }
}
