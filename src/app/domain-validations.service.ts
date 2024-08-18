import { Injectable } from '@angular/core';
import { Domain, Publisher } from './components/publishers-container/publishers-container.component';
import { HttpClient, HttpParams     } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DomainValidationsService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }
  // Get all publishers
  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${this.apiUrl}/publishers`);
  }

  //Add a new Publisher
  addPublisher(data: string): Observable<any> {
    const params = new HttpParams().set('publisherName', data);
    console.log('Params:', params.toString());  // Log the params to ensure they are correct
    return this.http.post<any>(`${this.apiUrl}/publishers`, null, { params });
  }


   // Get all domains
  getDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>(`${this.apiUrl}/domains`);
  }


  // Create a new domain
  createDomain(selectedPublisherIndex: number, domain: Domain): Observable<Domain> {
    const body = {
      selectedPublisherIndex: selectedPublisherIndex,
      domain: domain
    };

    return this.http.post<Domain>(`${this.apiUrl}/domains`, body).pipe(
      catchError(error => {
        if (error.status === 409) {
          // Show alert if the domain already exists (409 Conflict)
          alert('This domain is already configured on another publisher.');
        } else {
          console.error('An unexpected error occurred:', error);
        }
        return throwError(error);
      })
    );
  }

  
  // Update a specific domain
  updateDomain( domain: Domain, domainName: string): Observable<Domain> {
    const body = {
      domain: domain,
      domainCurrentName: domainName
    };
    return this.http.post<any>(`${this.apiUrl}/updateDomain`, body).pipe(
      catchError(error => {
        if (error.status === 409) {
          // Show alert if the domain already exists (409 Conflict)
          alert('This domain is already configured on another publisher.');
        } else {
          console.error('An unexpected error occurred:', error);
        }
        return throwError(error);
      })
    );
  }

  // Delete a specific domain
  deleteDomain(domainName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/domains/${domainName}`);
  }
}