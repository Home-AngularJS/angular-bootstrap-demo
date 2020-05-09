import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserGrant, UserGrantPermission } from '../model/user-role.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthentication implements CanActivate {

  constructor(private router: Router, private permission: UserGrantPermission) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.permission.isPermission(route.data.grant)) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}
