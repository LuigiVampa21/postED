import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
        .pipe(catchError((err:HttpErrorResponse)=>{
          let errorMessage = "Oops Something went wrong, try again later !";
          if(err.error.msg){
            errorMessage = err.error.msg;
          }
          this.dialog.open(ErrorComponent, {data: {message: errorMessage}})         
          return throwError(err)
        }))
        };
  }
