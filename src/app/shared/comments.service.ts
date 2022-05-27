import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Comments } from './comments';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private firestore: Firestore) {}
  addComment(comment: Comments) {
    const col = collection(this.firestore, 'Comments');
    return addDoc(col, comment);
  }
  getComments(): Observable<Comments[]> {
    const col = collection(this.firestore, 'Comments');
    return collectionData(col, { idField: 'id' }) as Observable<Comments[]>;
  }
}
