import {Observable,of} from 'rxjs';

export class AppServiceMock {
    constructor(){}
    getTeams() {return of({teamName: "Formula1"})}
    getMembers() { return of([{id: "1", firstName: "test", lastName: "test", jobTitle: "test", team: "test", status: "Active"}]); }
    deleteMember(id) { return of({});}
  }
  
export class NavigateMock {
    constructor(){}
    navigate() { return of({});}
}