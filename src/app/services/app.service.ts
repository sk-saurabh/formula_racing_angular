import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = 'http://localhost:8000/api';
  username: string;

  constructor(private http: HttpClient) {}

  public isAuthenticated() : Boolean {
  try{
    let userStorageData = localStorage.getItem('username');
    const userData = JSON.parse(userStorageData);
    if(userData && userData.username === "admin"){
     return true;
    }
  }catch(err){
    //no need to handle here
    //Simply return at next statement
    console.log("error: ", err);
  }
    return false;
  }

  // Returns all members
  getMembers() {
    console.log("calling backend service to :",`${this.api}/members`);
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  //Return member by Id

  getMemberById(id){
    return this.http
      .get(`${this.api}/members/${id}`)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }
  //Add or Save a new member
  addMember(memberForm) {
    return this.http
    .post<any>(`${this.api}/addMember`, memberForm)
    .subscribe(newMember => console.log("Added Successfully!"));
  }
  //Update a member
  updateMember(id,memberData) {
    return this.http
    .put<any>(`${this.api}/updateMember/${id}`, memberData)
    .subscribe(updatedMember => console.log("Updated Successfully!"));
  }
  //Delete a member
  deleteMember(id) {
   return this.http
    .delete<any>(`${this.api}/deleteMember/${id}`);
  }
  //Return all teams
  getTeams() {
    console.log("getting teams", `${this.api}/teams`);
    // const teams = [{"id":"1","team":"team1"}];
    // return of(teams);
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
