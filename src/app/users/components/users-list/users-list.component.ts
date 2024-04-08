import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserService } from '../../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateEditDialogComponent } from '../create-edit-dialog/create-edit-dialog.component';
import { LocalStorageService } from '../../services/local-storage-service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    UserCardComponent,
    MatButtonModule,
    CreateEditDialogComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  public userService = inject(UserService);

  private matDialog = inject(MatDialog);
  public dialogRef!: MatDialogRef<CreateEditDialogComponent>;

  public localUsers!: User[];

  public localStorageService = inject(LocalStorageService);

  constructor() {}

  ngOnInit(): void {
    this.localUsers = this.localStorageService.getItem('users');

    if (this.localUsers.length === 0) {
      this.userService.getUsers();
      return;
    }

    this.userService.usersSubject$.next(this.localUsers);
  }

  onDelete(a: User) {
    this.userService.deleteUserById(a.id);

    const users: User[] = this.localStorageService.getItem('users');

    if (users !== null) {
      this.localStorageService.setItem(
        'users',
        users.filter((user: User) => user.id !== a.id)
      );
    }
  }

  onOpenDialog() {
    this.dialogRef = this.matDialog.open(CreateEditDialogComponent, {
      data: { isEdit: false },
      width: '400px',
    });

    this.dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        this.userService.createUser({ id: Math.random(), ...user });

        this.localStorageService.setItem('users', [
          ...this.localStorageService.getItem('users'),
          user,
        ]);
      }
    });
  }
}
