import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, segments) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  const admin = authService.isAdmin()

  return admin ? admin : router.navigate(["index"])
};
