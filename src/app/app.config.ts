import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { JwtInterceptor } from './auth/jwt.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([JwtInterceptor])),
    importProvidersFrom(RouterModule.forRoot(routes)),
  ],
};


