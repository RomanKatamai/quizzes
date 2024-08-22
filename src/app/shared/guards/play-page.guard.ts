import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const playPageGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean> | Promise<boolean> | boolean => {
  const quiz = JSON.parse(localStorage.getItem('test') as string);
  const router = inject(Router);
  if(quiz) {
    return true;
  }

  router.navigate(['home']);
  return false;
};
