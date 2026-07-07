import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
 
export const authInterceptor=(req:any, next: any)=>{
  const token= localStorage.getItem('token');
  if(token){
    req=req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    });
  }
  return next(req)
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};