import {ApplicationConfig, importProvidersFrom} from "@angular/core";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(RouterModule.forRoot(routes))
]
};
