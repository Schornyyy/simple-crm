import { Component, Input, OnInit, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { Observable } from 'rxjs';
import { Notice } from '../models/notice.class';
import { DialogCreateNoticeComponent } from '../dialog-create-notice/dialog-create-notice.component';
import { DialogEditNoticeComponent } from '../dialog-edit-notice/dialog-edit-notice.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId: string | null = '';
  firestore: Firestore = inject(Firestore);
  user$: User = new User();
  customerNoticesObs$: Observable<Notice[]>;
  customerNotices: Notice[] = [];
  userData$: Observable<any[]>;

  @Input() id!: string;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.userData$ = collectionData(collection(this.firestore, 'users'), {
      idField: 'id',
    });

    this.customerNoticesObs$ = collectionData(
      collection(this.firestore, 'notices'),
      {
        idField: 'id',
      }
    ) as Observable<Notice[]>;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
    });

    this.userData$.subscribe((changes: any[]) => {
      changes.forEach((change) => {
        if (change.id == this.userId) {
          this.user$ = new User(change);
        }
      });
    });

    this.customerNoticesObs$.subscribe((changes: Notice[]) => {
      this.customerNotices = [];
      changes.forEach((change) => {
        console.log(change);

        if (change.customerId == this.userId) {
          this.customerNotices.push(new Notice(change));
        }
      });
    });
  }

  editUserDetails() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user$.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user$.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  addNewNotice() {
    const dialog = this.dialog.open(DialogCreateNoticeComponent);
    dialog.componentInstance.userId = this.userId!;
  }

  editNotice(id: number) {
    const dialog = this.dialog.open(DialogEditNoticeComponent);
    dialog.componentInstance.notice = new Notice(
      this.customerNotices[id].toJSON()
    );
    dialog.componentInstance.docId = this.customerNotices[id].id;
  }

  async deleteNotice(id: number) {
    console.log(this.customerNotices[0]);

    await deleteDoc(
      doc(this.firestore, 'notices', '' + this.customerNotices[id].id)
    );
  }

  checkNotice(id: number) {
    let docId = this.customerNotices[id].id;
    updateDoc(doc(this.firestore, 'notices', docId), {
      done: !this.customerNotices[id].done,
    });
  }
}
