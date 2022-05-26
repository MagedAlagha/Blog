import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'plog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Blog-MajedAlagha';
  constructor(
    public dialog: MatDialog,
    public authservice: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {}
  ngOnInit(): void {}

  LogInDialog() {
    this.dialog.open(LoginFormComponent);
  }
  Logout() {
    this.authservice
      .logout()
      .pipe(
        this.toast.observe({
          success: 'Signed out successfully',
          loading: 'Logging in...',
          error: 'There was an error',
        })
      )
      .subscribe((value) => {
        console.log(value);
        localStorage.removeItem('user');
        this.router.navigate(['']);
      });
  }
}
