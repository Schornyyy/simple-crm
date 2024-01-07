import { Component, Inject } from '@angular/core';
import { Notice } from '../models/notice.class';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-notice',
  templateUrl: './dialog-edit-notice.component.html',
  styleUrl: './dialog-edit-notice.component.scss',
})
export class DialogEditNoticeComponent {
  loading: boolean = false;
  notice!: Notice;
  docId: string = '';
  firestore: Firestore = Inject(Firestore);

  constructor(private dialogRef: MatDialogRef<DialogEditNoticeComponent>) {}

  closeDialog() {
    console.log(this.docId);
    this.dialogRef.close();
  }

  saveNotice() {
    this.loading = true;
    updateDoc(
      doc(this.firestore, 'notices', this.docId),
      this.notice.toJSON()
    ).then((resp) => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
