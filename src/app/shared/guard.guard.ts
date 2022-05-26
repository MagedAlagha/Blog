import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  routName: any;
  canActivate() {
    if (this.auth.isLoggedIn) {
      return true;
    } else {
      alert('In Guard : The Minutes is Odd');
      return false;
    }
  }
}
