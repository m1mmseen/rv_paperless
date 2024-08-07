import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {PDFDocument} from "pdf-lib";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadPdfService {


  constructor(private http: HttpClient) { }

  sendFile(formData: FormData): Observable<{name: string}> {
    return this.http.post<{name: string}>('http://localhost:3000/upload', formData, {
      headers: {
        'Accept': 'application/json',
      },
      responseType: 'json',
    }).pipe(catchError(this.handleError))
  }

  getFile(filePath: string): Observable<Blob>{
    return this.http.get(filePath, {responseType: 'blob'}).pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage:string;
    if (error.status === 0) {
      errorMessage = "A client-side or network error occurred. Please try again later.";
    } else if (error.status === 404 ){
      errorMessage = "There is no invoice with this id";
    }
    else if (error.status === 400 ){
      errorMessage = "Sorry, some error happens. Please try again later";
    }
    else if (error.status === 500 ){
      errorMessage = "Server Error";
    }
    return throwError(() => ({ message: errorMessage, status: error.status }));
  }
}
