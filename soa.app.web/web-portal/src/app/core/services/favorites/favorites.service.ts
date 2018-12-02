import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(
    private http: HttpClient
  ) { }

  get() {
    return this.http.get(`${environment.apiUrl}/api/books/favorites`);
  }

  add(isbn) {
    return this.http.post(`${environment.apiUrl}/api/books/favorites`, {
      isbn: isbn
    });
  }

  delete(isbn) {
    return this.http.delete(`${environment.apiUrl}/api/books/favorites/${isbn}`);
  }

}
