import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export const userGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean> | Promise<boolean> | boolean => {
  const auth = localStorage.getItem('fb-token');
  const router = inject(Router);

  if(auth) {
    return true;
  }

  router.navigate(['home']);
  return false;
}
