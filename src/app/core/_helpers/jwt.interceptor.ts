import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError,  Observable ,  BehaviorSubject } from 'rxjs';
import { take, filter, catchError, switchMap, finalize } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const token = window.localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + token } // https://stackoverflow.com/questions/49802163/authorization-bearer-token-angular-5  |  https://stackoverflow.com/questions/47400929/how-to-add-authorization-header-to-angular-http-request  |  https://ionicacademy.com/ionic-http-interceptor   ( https://www.jujens.eu/posts/en/2015/Jun/27/webdav-options  |  https://metanit.com/web/angular2/6.5.php  |  https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing )
      });
    }
    return next.handle(request).pipe(
      catchError(error => {
        console.log( JSON.stringify(error) );
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return this.handle400Error(error);
            case 401:
              return this.handle401Error();
            case 500:
              return this.handle500Error(error);
            default:
              return observableThrowError(error);
          }
        } else {
          return observableThrowError(error);
        }
      }));
  }

  handle500Error(error) {
    if (error && error.status === 500 && error.error) {
      // confirm(JSON.stringify(error));
    }
    return observableThrowError(error);
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      return this.logoutUser();
    }
    return observableThrowError(error);
  }

  handle401Error() {
    return this.logoutUser();
  }

  logoutUser() {
    this.router.navigate(['login']);
    // return observableThrowError('не залогиненный пользователь');
    return observableThrowError('сеанс был прерван');
  }
}
