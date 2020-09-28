import { Injectable } from '@angular/core';
import { Participant, Student } from './setup-mutation.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConnectableObservable, Observable, throwError } from 'rxjs';
import { catchError, publishLast, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface ExternCourse {
  title: string;
  description: string;
}
export interface FullExternCourse extends ExternCourse {
  timeSlots: ExternTimeSlot[]
}

export interface ExternTimeSlot {
  id: number;
  time: string;
  destination: string;
  groups: ExternGroup[];
}
export interface ExternGroup {
  id: number;
  name: string;
  signUps: ExternSignup[];
}
export interface ExternSignup {
  id: number;
  state: SignUpState;
  student: ExternStudent;
}

export enum SignUpState
{
    None   = 0,
    Tank   = 0b1000000,
    Healer = 0b0100000,
    Melee  = 0b0010000,
    Ranged = 0b0001000,
    Caster = 0b0000100,
    Dps    = 0b0000010,
    Backup = 0b0000001
}
export interface ExternStudent {
  id: number;
  ingameName: string;
}

export type DestinationGroup = {
  id: number,
  name: string,
  entries: Destination[]
};

export type Destination = {
  id: number,
  name: string,
};

export type Time = {
  id: number,
  text: string,
};

@Injectable({
  providedIn: 'root'
})
export class DataRetrievalService {
  baseUrl = environment.production ? '' : 'http://localhost:5001'

  deleteAutocompleteDestinationGroup(group: DestinationGroup): Observable<void> {
    const response = this.http.delete<Time>(`${this.baseUrl}/sync/autocomplete/destinations/${group.id}` )
    .pipe(publishLast());
    (response as ConnectableObservable<Time>).connect();
    return response;
  }
  putAutocompleteDestinationGroup(group: DestinationGroup): Observable<DestinationGroup> {
    const response = this.http.put<Time>(`${this.baseUrl}/sync/autocomplete/destinations/${group.id}`, group )
    .pipe(publishLast());
    (response as ConnectableObservable<Time>).connect();
    return response;
  }

  constructor( private http: HttpClient ) { }

  getRoster( ): Observable<Student[]> {
    const roster = this.http.get<Student[]>(`${this.baseUrl}/sync/roster`)
    .pipe(publishLast());
    (roster as ConnectableObservable<Student>).connect();
    return roster;
  }
  getAutocompleteDestinations( ): Observable<DestinationGroup[]> {
    const response = this.http.get<DestinationGroup[]>(`${this.baseUrl}/sync/autocomplete/destinations`)
    .pipe(publishLast());
    (response as ConnectableObservable<DestinationGroup[]>).connect();
    return response;
  }
  getAutocompleteTimes( ): Observable<Time[]> {
    const response = this.http.get<Time[]>(`${this.baseUrl}/sync/autocomplete/times`)
    .pipe(publishLast());
    (response as ConnectableObservable<Time[]>).connect();
    return response;
  }
  putAutocompleteTime( time: Time ): Observable<Time> {
    const response = this.http.put<Time>(`${this.baseUrl}/sync/autocomplete/times/${time.id}`, time )
    .pipe(publishLast());
    (response as ConnectableObservable<Time>).connect();
    return response;
  }
  deleteAutocompleteTime( time: Time ): Observable<void> {
    const response = this.http.delete(`${this.baseUrl}/sync/autocomplete/times/${time.id}` )
    .pipe(publishLast());
    (response as ConnectableObservable<any>).connect();
    return response;
  }
  createAutocompleteTime( time: Time ): Observable<Time> {
    const response = this.http.post<Time>(`${this.baseUrl}/sync/autocomplete/times`, time )
    .pipe(publishLast());
    (response as ConnectableObservable<Time>).connect();
    return response;
  }

  
  getCourses(sort: string, order: string, page: number, pageSize: number): Observable<ExternCourse[]> {
    const href = `${this.baseUrl}/sync/courses`;
    const requestUrl =
      `${href}?$sort=${sort}&$order=${order}&$page=${page}&$pageSize=${pageSize}`;

    const response = this.http.get<ExternCourse[]>(requestUrl)
    .pipe(publishLast());
    (response as ConnectableObservable<ExternCourse[]>).connect();
    return response;
  }
  
  getCourse(id: number): Observable<FullExternCourse> {
    const href = `${this.baseUrl}/sync/courses`;
    const requestUrl =
      `${href}/${id}`;

    const response = this.http.get<FullExternCourse>(requestUrl)
    .pipe(publishLast());
    (response as ConnectableObservable<FullExternCourse>).connect();
    return response;
  }
}
