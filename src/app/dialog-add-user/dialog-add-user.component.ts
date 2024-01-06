import { Component, inject } from '@angular/core';
import { User } from '../models/user.class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate?: Date;
  firestore: Firestore = inject(Firestore);
  loading: boolean = false;

  constructor(private dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
    addDoc(collection(this.firestore, 'users'), this.user.toJSON()).then(
      (res) => {
        this.loading = false;
        this.dialogRef.close();
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
