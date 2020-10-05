import { TestBed, async, inject } from '@angular/core/testing';
import { AppService } from './app.service';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {

  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/cookies'};
  let routerMock = {navigate: jasmine.createSpy('navigate')}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock },],
      imports: [HttpClientTestingModule]
    });
  });

  it('should create Authguard', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should redirect an unauthenticated user to the login route', inject([AuthGuard], (guard: AuthGuard) => {
    localStorage.setItem('username',"notAdmin");
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
  }));
 
  it('should allow the authenticated user to members page', inject([AuthGuard, AppService], (guard: AuthGuard, appService: AppService) => {
    spyOn(appService, 'isAuthenticated').and.returnValue(true);
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  }));

});
