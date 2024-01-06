import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user.class';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent implements OnInit {
  loading: boolean = false;
  user!: User;
  userId: String | null = '';
  firestore: Firestore = inject(Firestore);

  constructor(private dialogRef: MatDialogRef<DialogEditUserComponent>) {}

  ngOnInit(): void {}

  saveUser() {
    this.loading = true;
    console.log(this.user);

    updateDoc(
      doc(this.firestore, 'users', '' + this.userId),
      this.user.toJSON()
    ).then((resp) => {
      this.loading = false;
      this.dialogRef.close();
    });
  }

  closeDialog() {}
}
