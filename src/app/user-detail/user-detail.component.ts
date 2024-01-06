import { Component, OnInit, inject } from '@angular/core';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  collectionSnapshots,
  doc,
  docData,
  getDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { Observable, ObservableInput, from } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId: string | null = '';
  firestore: Firestore = inject(Firestore);
  user$: User = new User();
  userData$: Observable<any[]>;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.userData$ = collectionData(collection(this.firestore, 'users'), {
      idField: 'id',
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
      this.getUser();
    });

    this.userData$.subscribe((changes: any[]) => {
      changes.forEach((change) => {
        if (change.id == this.userId) {
          this.user$ = new User(change);
        }
      });
    });
  }

  async getUser() {
    let docRef = doc(this.firestore, 'users', '' + this.userId);
    let userDoc = (await getDoc(docRef)).data();

    this.user$ = new User(userDoc);
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
}
