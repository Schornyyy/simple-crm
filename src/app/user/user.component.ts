import { Component, OnInit, inject } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user.class';
import {
  Firestore,
  collection,
  collectionChanges,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { changeToData } from '@angular/fire/database';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user: User = new User();
  private firestore: Firestore = inject(Firestore);
  users$: Observable<any[]>;
  allUsers: User[];

  constructor(public dialog: MatDialog) {
    this.users$ = collectionData(collection(this.firestore, 'users'), {
      idField: 'id',
    });
    this.allUsers = [];
  }

  ngOnInit(): void {
    this.users$.subscribe((changes: any[]) => {
      this.allUsers = changes;

      console.log(changes);
    });
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }
}
