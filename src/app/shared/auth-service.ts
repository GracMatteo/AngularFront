import { Injectable } from '@angular/core';
import { User } from './dataUsers';
import { users } from './dataUsers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  currentUser: User | undefined;

  logIn(username: string, password: string): boolean {
    const user: User | undefined = users.find(user => user.username === username && user.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logOut() {
    this.loggedIn = false;
    this.currentUser = undefined;
  }

  isAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.currentUser?.role === 'admin');
    });
    return isUserAdmin;
  }

  isLogged() {
    const isUserLogged = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    return isUserLogged;
  }

}
