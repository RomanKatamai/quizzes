import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const finishPageGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean> | Promise<boolean> | boolean => {
  const points = JSON.parse(localStorage.getItem('points') as string);
  const router = inject(Router);
  if(points) {
    return true;
  }

  router.navigate(['home']);
  return false;
};
