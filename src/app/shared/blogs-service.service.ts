import { Injectable } from '@angular/core';
import {
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Blog } from './Blogs';
export enum Collections {
  POST = 'post',
}

@Injectable({
  providedIn: 'root',
})
export class BlogsServiceService {
  constructor(private firestore: Firestore) {}

  getAll(): Observable<Blog[]> {
    const col = collection(this.firestore, 'Blogs');
    return collectionData(col, { idField: 'id' }) as Observable<Blog[]>;
  }
  getById(id: string) {
    const empDoc = doc(this.firestore, `${'Blogs'}/${id}`);
    return docData(empDoc, { idField: 'id' }) as Observable<Blog>;
  }

  create(blogs: Blog) {
    const col = collection(this.firestore, 'Blogs');
    return addDoc(col, blogs);
  }
  update(blogs: Blog) {
    const col = doc(this.firestore, `${'Blogs'}/${blogs.id}`);
    return setDoc(col, blogs);
  }
  delete(id: string) {
    const delPost = doc(this.firestore, `${'Blogs'}/${id}`);
    return deleteDoc(delPost);
  }
}
