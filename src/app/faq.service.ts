import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, zip } from 'rxjs/operators';
import { stream } from 'ndjson-rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private bucket = 'https://s3.amazonaws.com/murphpolly/';
  private markFile = 'https://s3.us-east-1.amazonaws.com/murphpolly/aws_faq_polly_test__Joanna.e5f2a85d-7717-4a00-81bf-6f786f4089bd.marks';
  constructor(private http: HttpClient) { }

  getFaq(faqDomain){
    // This is typescript template string at work. Note the back tic.
    const urlEndPoint = `${this.bucket}${faqDomain}.json`;
    console.log(urlEndPoint);
    return this.http.get<any>(urlEndPoint).pipe(
      tap(data => console.log('We have the data!')),
      catchError(this.handleError)
    );
  }
  // https://medium.com/@deaniusaur/how-to-stream-json-data-over-rest-with-observables-80e0571821d3
  // https://github.com/jh3141/ndjson-rxjs/blob/master/index.js
  getMark(uri_marks) {
    console.log('getMark file');
    return stream(uri_marks).pipe(
      //  tap(data => console.log(data)),
       map(data => data),
       catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError('Generic');
  }
}
