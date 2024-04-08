import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private http = inject(HttpClient);

  constructor() {}

  getUsers() {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  // deleteUserApi(id: number): any {
  //   return this.http.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  // }
}
