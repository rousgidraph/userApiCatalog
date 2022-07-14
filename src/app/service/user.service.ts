import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Response } from '../interface/response.interface';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = "https://randomuser.me/api";

  constructor(private http: HttpClient) { }
  
  //fetch users 
  getUsers(size: number = 10): Observable<Response>{

    return this.http.get<Response>(`${this.apiUrl}/?results=${size}`).pipe(
      map(this.processResponse));
  }

  //fetch one user using uuid 
  getUser(uuid: string): Observable<Response>{
    console.log("get user called ");
    
    return this.http.get<Response>(`${this.apiUrl}/?uuid=${uuid}`).pipe(
      map(this.processResponse));
  }

  private processResponse(response: Response): Response{
    return {
      info: { ...response.info},
      results: response.results.map((user: any ) => (<User>{
        uuid: user.login.uuid, 
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        userName: user.login.username,
        gender: user.gender,
        address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
        dateOfBirth: user.dob.date,
        phone : user.phone,
        imageUrl: user.picture.medium,
        coordinates: {latitude: +user.location.coordinates.latitude, longitude: +user.location.coordinates.longitude },
      }))
    };
  }

}
