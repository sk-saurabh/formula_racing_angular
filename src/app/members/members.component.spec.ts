import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';

import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../services/app.service';
import { RouterModule } from '@angular/router';
import { ToastrModule} from 'ngx-toastr';
import {of} from 'rxjs';

class AppServiceMock {
  constructor(){}
  getMembers() { return of([{id: "1", firstName: "test", lastName: "test", jobTitle: "test", team: "test", status: "Active"}]); }
  deleteMember(id) { return of({});}
}

class NavigateMock {
  constructor(){}
  navigate() { return of({});}
}

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let appService;
  let routeService;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [HttpClientModule, RouterModule, ToastrModule.forRoot()],
      providers: [
        {
          provide: Router,
          useValue: new NavigateMock()
        },
        { provide: AppService, useValue: new AppServiceMock() }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    appService = TestBed.get(AppService);
    routeService = TestBed.get(Router);
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
  });

  it('should create members component', () => {
    expect(component).toBeTruthy();
  });

  it('should set an Item', () => {
    let value = 'bar';
    localStorage.setItem('foo', value); // bar
    expect(window.localStorage.getItem('foo')).toBe('bar'); // bar
  });

  it('should remove Item', () => {
    const button = fixture.debugElement.nativeElement.querySelector('.btnDelete');
    const delMemberSpy = spyOn(appService , 'deleteMember');
    button.click();
    fixture.detectChanges();
    expect(delMemberSpy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to memberdetail when clicked on update button', () => {
    const button = fixture.debugElement.nativeElement.querySelector('.btnUpdate');
    const routerSpy = spyOn(routeService , 'navigate');
    button.click();
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to memberdetail when add button clicked', () => {
    const button = fixture.debugElement.nativeElement.querySelector('.btnAdd');
    const routerSpy = spyOn(routeService , 'navigate');
    button.click();
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledTimes(1);
  });

  afterEach(() => { (2)
    appService = null;
    routeService = null;
    localStorage.clear();
  });
});
