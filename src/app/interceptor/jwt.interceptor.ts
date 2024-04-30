import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token")
  const loader = inject(NgxUiLoaderService)
  const validadorAsync = req.url.includes("socioByDni") || req.url.includes("socioByEmail") || req.url.includes("barcoByMatricula") || req.url.includes("barcoByNumAmarre") || req.url.includes("salidas/") || req.url.includes("barco/")
  
  if(!validadorAsync) {

    loader.start();
  }

  if (token) {
    req = req.clone({
      setHeaders: {Authorization: token}
    })
  }
  
  return next(req).pipe(
    finalize(()=> loader.stop())
  )
};
