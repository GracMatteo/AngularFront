import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Assignments } from '../components/assignments/assignments';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from './shared/auth-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, RouterLink, MatSlideToggleModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('assignment-app');

  constructor(public authService: AuthService, private router: Router) { }

  opened = false;

  login() {
    if (!this.authService.loggedIn) {
      console.log("login");
      this.router.navigate(['/login']);
    } else {
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }


  toggleSidenav() {
    this.opened = !this.opened;
  }
}
