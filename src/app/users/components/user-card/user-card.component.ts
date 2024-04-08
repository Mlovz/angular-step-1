import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateEditDialogComponent } from '../create-edit-dialog/create-edit-dialog.component';
import { UserService } from '../../services/users.service';
import { User } from '../../models/user';
import { LocalStorageService } from '../../services/local-storage-service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CreateEditDialogComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter<User>();

  public userService = inject(UserService);
  private matDialog = inject(MatDialog);
  public localStorageService = inject(LocalStorageService);

  public dialogRef?: MatDialogRef<CreateEditDialogComponent>;

  constructor() {}

  onDeleteUser(user: User) {
    this.deleteUser.emit(user);
  }

  onEditUser(newUser: User) {
    this.dialogRef = this.matDialog.open(CreateEditDialogComponent, {
      data: { isEdit: true, user: newUser },
      width: '400px',
    });

    this.dialogRef?.afterClosed().subscribe((res) => {
      if (res) {
        this.userService.editUser({ ...newUser, ...res });
        const users: User[] = this.localStorageService.getItem('users');
        if (users !== null) {
          this.localStorageService.setItem(
            'users',
            users.map((user) => (user.id === res.id ? res : user))
          );
        }
      }
    });
  }
}
