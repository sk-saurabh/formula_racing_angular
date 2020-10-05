import { TestBed, inject } from '@angular/core/testing';

import { AppService } from './app.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppService', () => {
  const dummyMembers = {
    data: [
      { id: 1, firstName: 'George', lastName: 'Bluth', jobTitle: 'Developer', team: 'Formula1', status: "Active" }
    ]
  };

  const dummyTeams = {
    data: [
      { id: 1, teamName: 'Formula1'},
      { id: 2, firstName: 'Formula2' }
    ]
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it('should check user authentication', inject([AppService], (service: AppService) => {
    localStorage.setItem('username',JSON.stringify({ username: 'admin' }));
    expect(service.isAuthenticated()).toBeTruthy();
  }));

  it('getMember() should return data', inject([HttpTestingController, AppService], (httpMock: HttpTestingController, service: AppService) => {
    const testUrl = `http://localhost:8000/api/members`;
    // We call the service
    service.getMembers().subscribe(data => {
      expect(data).toEqual(dummyMembers);
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    req.flush(dummyMembers);
  }));

  it('getTeams() should return data', inject([HttpTestingController, AppService], (httpMock: HttpTestingController, service: AppService) => {
    const testUrl = `http://localhost:8000/api/teams`;
    // We call the service
    service.getTeams().subscribe(data => {
      expect(data).toEqual(dummyTeams);
    });
    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    req.flush(dummyTeams);
  }));

  it('getMemberById() should return member by Id', inject([HttpTestingController, AppService], (httpMock: HttpTestingController, service: AppService) => {
    const testUrl = `http://localhost:8000/api/members/1`;
    service.getMemberById('1').subscribe((res) => {
      expect(res).toEqual(dummyMembers); 
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('GET');
    // Note That we are flushing dummy "http" response
    req.flush(dummyMembers); 
  }));

  it('deleteMember() should delete a member', inject([HttpTestingController, AppService], (httpMock: HttpTestingController, service: AppService) => {
    const testUrl = `http://localhost:8000/api/deleteMember/1`;
    service.deleteMember('1').subscribe((res) => {
      expect(res).toEqual({}); 
    });

    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toBe('DELETE');
    // Note That we are flushing dummy "http" response
    req.flush({}); 
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

});
