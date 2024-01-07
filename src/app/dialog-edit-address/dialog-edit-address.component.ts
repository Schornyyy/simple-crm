import { Component, OnInit, inject } from '@angular/core';
import { User } from '../models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent implements OnInit {
  loading: boolean = false;
  user!: User;
  userId: String | null = '';
  firestore: Firestore = inject(Firestore);

  constructor(private dialogRef: MatDialogRef<DialogEditAddressComponent>) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  saveUser() {
    this.loading = true;
    updateDoc(
      doc(this.firestore, 'users', '' + this.userId),
      this.user.toJSON()
    ).then((resp) => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
