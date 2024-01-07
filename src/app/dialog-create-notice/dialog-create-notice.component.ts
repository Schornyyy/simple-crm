import { Component, inject } from '@angular/core';
import { Notice } from '../models/notice.class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-notice',
  templateUrl: './dialog-create-notice.component.html',
  styleUrl: './dialog-create-notice.component.scss',
})
export class DialogCreateNoticeComponent {
  loading: boolean = false;
  notice: Notice = new Notice();
  firestore: Firestore = inject(Firestore);
  userId!: string;

  constructor(private dialogRef: MatDialogRef<DialogCreateNoticeComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

  saveNotice() {
    this.loading = true;
    this.notice.createdAt = new Date().toUTCString();
    this.notice.customerId = this.userId;
    this.notice.done = false;
    this.notice.editedAt = new Date().toUTCString();
    addDoc(collection(this.firestore, 'notices'), this.notice.toJSON()).then(
      (resp) => {
        this.loading = false;
        this.dialogRef.close();
      }
    );
  }
}
