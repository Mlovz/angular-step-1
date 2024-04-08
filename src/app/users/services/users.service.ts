import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, delay, of, tap } from 'rxjs';
import { UsersApiService } from './users-api.service';
import { LocalStorageService } from './local-storage-service';
import { User } from '../models/user';

// interface Users {
//   id: number;
//   name: string;
// }

@Injectable({ providedIn: 'root' })
export class UserService {
  private userApi = inject(UsersApiService);

  public readonly usersSubject$ = new BehaviorSubject<any[]>([]);

  public readonly users$ = this.usersSubject$.asObservable();

  public isLoading$ = new BehaviorSubject<boolean>(false);
  public error = new BehaviorSubject<string>('');

  private localStorageService = inject(LocalStorageService);

  private localUsers: any = [];

  constructor() {}

  getUsers(): void {
    this.isLoading$.next(true);
    this.userApi
      .getUsers()
      .pipe(
        delay(1000),
        catchError((error) => {
          this.isLoading$.next(false);
          this.error.next(error.message);
          return of([]);
        })
      )
      .subscribe((res) => {
        this.usersSubject$.next(res);
        this.localStorageService.setItem('users', res);
        this.isLoading$.next(false);
      });
  }

  deleteUserById(id: number): void {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((item) => item.id !== id)
    );
    // this.localUsers.filter((item: any) => item.id !== id);
  }

  createUser(user: User): void {
    this.usersSubject$.next([...this.usersSubject$.value, user]);
    // this.localUsers = this.localStorageService.getItem('users') || [];
    // this.localStorageService.setItem('users', [...this.localUsers, user]);
  }

  editUser(newUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.map((item) =>
        item.id === newUser.id ? newUser : item
      )
    );

    // this.localUsers.map((item: any) =>
    //   item.id === newUser.id ? newUser : item
    // );
  }
}
