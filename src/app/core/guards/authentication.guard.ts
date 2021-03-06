import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { AmplifyService } from 'src/app/core/services/amplify.service';
import { APP_ROUTES } from '../../utils/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private amplify: AmplifyService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    return await this.checkAuth(route, state);
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    return await this.checkAuth(route, state);
  }

  // TODO: update check auth
  private async checkAuth(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { queryParams }: ActivatedRouteSnapshot,
    { url }: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    if (await this.amplify.isAuthenticated) {
      return true;
    }

    if (url.split('?').length) {
      url = url.split('?')[0];
    }

    const redirectTo = APP_ROUTES.signin.split('/');

    return this.router.createUrlTree(['/', ...redirectTo]);
  }
}
