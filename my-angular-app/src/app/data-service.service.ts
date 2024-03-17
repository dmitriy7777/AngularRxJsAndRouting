import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  private imageUrl = 'https://randomfox.ca/floof/';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.postsUrl);
  }

  getImage(): Observable<any> {
    return this.http.get<any>(this.imageUrl);
  }
}
