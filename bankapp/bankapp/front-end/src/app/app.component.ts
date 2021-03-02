import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private role!: string;
  isLoggedIn = false;
  showUserManagement = false;
  showProductManagement = false;
  username?: string;
  title = 'front-end';
  decodedToken!: any;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.decodedToken = jwt_decode(user.access);
      this.role = this.decodedToken.role;
      this.username = this.decodedToken.username;
      this.showProductManagement = this.role.includes('ADMIN' || 'PRODUCT-MANAGER');
      this.showUserManagement = this.role.includes('ADMIN');
    }
  }

  logout(): void {
    this.tokenStorageService.logout();
    window.location.replace('login');
  }
}
