import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorage: TokenStorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.tokenStorage.getUser();
    if (this.tokenStorage.getToken()) {
      return true;
    } else {
      // not logged in, so redirect to login page with the return URL
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }


}
