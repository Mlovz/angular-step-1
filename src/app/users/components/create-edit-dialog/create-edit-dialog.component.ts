import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatButtonModule,
    MatDialogModule,
    MatDialogContent,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-edit-dialog.component.html',
  styleUrl: './create-edit-dialog.component.scss',
})
export class CreateEditDialogComponent implements OnInit {
  data: any = inject(MAT_DIALOG_DATA);

  public dialogForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    username: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<CreateEditDialogComponent>) {}

  ngOnInit(): void {
    if (this.data.user) {
      this.dialogForm.patchValue(this.data.user);
    }
  }

  onClick() {
    if (this.data.isEdit) {
      this.dialogRef?.close(this.dialogForm.value);
    } else {
      this.dialogRef?.close(this.dialogForm.value);
    }
  }
}
