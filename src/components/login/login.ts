import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../app/shared/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatFormField, MatLabel, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  password: any;
  username: any;


  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.logIn(this.username, this.password);
    this.router.navigate(['/home']);
  }


}
