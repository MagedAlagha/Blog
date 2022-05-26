import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = authState(this.auth);
  constructor(private auth: Auth) {}

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }
  logout() {
    return from(this.auth.signOut());
  }

  get isLoggedIn(): boolean {
    var userLocal = localStorage.getItem('user');
    var user;
    if (userLocal) {
      user = JSON.parse(userLocal);
    }
    console.log('user', user);
    return user !== null && user.stsTokenManager.accessToken ? true : false;
  }
}
