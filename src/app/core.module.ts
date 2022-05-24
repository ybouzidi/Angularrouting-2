import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { AuthTokenInterceptorService } from "./services/auth-token-interceptor.service";
import { AuthService } from "./services/auth.service";
import { AuthGuardService } from "./services/guards/auth-guard.service";
import { DeactivateGaurdService } from "./services/guards/deactivate-gaurd.service";
import { LoggingInterceptorService } from "./services/logging-interceptor.service";
import { UserResolveService } from "./services/resolvers/user-resolve.service";

@NgModule({
    providers:[
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoggingInterceptorService,
            multi: true
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthTokenInterceptorService,
            multi: true
          },
          AuthService,
          AuthGuardService,
          DeactivateGaurdService,
          UserResolveService,
    ]
})
export class CoreModule{

}