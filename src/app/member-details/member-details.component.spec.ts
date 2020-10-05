import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
//import { AppServiceMock, NavigateMock } from '../testMockClasses/mockSpyClasses';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../services/app.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule} from 'ngx-toastr';
import {Observable,of} from 'rxjs';
import { ToastrService } from 'ngx-toastr';

class AppServiceMock {
  constructor(){}
  addMember({}) { return of({}); }
  updateMember(id,{}) { return of({}); }
  getTeams() {return of([{id: "1", teamName: "Formula1"}])}
}

class NavigateMock {
  constructor(){}
  navigate() { return of({});}
}

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let appService;
  let routeService;

  const updateForm = (firstName, lastName, jobTitle, team, status) => {
    fixture.componentInstance.memberForm.controls['firstName'].setValue(firstName);
    fixture.componentInstance.memberForm.controls['lastName'].setValue(lastName);
    fixture.componentInstance.memberForm.controls['jobTitle'].setValue(jobTitle);
    fixture.componentInstance.memberForm.controls['team'].setValue(team);
    fixture.componentInstance.memberForm.controls['status'].setValue(status);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        ToastrModule.forRoot()
      ],
      providers: [
        HttpClient,
        FormBuilder,
        { provide: Router, useValue: new NavigateMock() },
        { provide: AppService, useValue: new AppServiceMock() }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    appService = TestBed.get(AppService);
    routeService = TestBed.get(Router);
    
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
     return store[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
  });

  it('should create Member details component', () => {
    expect(component).toBeTruthy();
  });

  it('should get an Item', () => {
    let value = 'bar';
    localStorage.setItem('foo', value); // bar
    expect(localStorage.getItem('foo')).toBe('bar'); // bar
  });

  // it('should update when save button is clicked!', () => {
  //   localStorage.setItem('memberId', "1"); 
  //   expect(localStorage.getItem('memberid')).toBe('1'); 
  //   const button = fixture.debugElement.nativeElement.querySelector('.btnSave');
  //   const updateMemberSpy = spyOn(appService , 'updateMember');
  //   button.click();
  //   fixture.detectChanges();
  //   expect(updateMemberSpy).toHaveBeenCalledTimes(1);
  // });

  // it('should post when save button is clicked!', () => {
  //   localStorage.removeItem('memberId'); 
  //   expect(localStorage.getItem('memberid')).toBeNull(); 
  //   const button = fixture.debugElement.nativeElement.querySelector('.btnSave');
  //   const addMemberSpy = spyOn(appService , 'addMember');
  //   button.click();
  //   fixture.detectChanges();
  //   expect(addMemberSpy).toHaveBeenCalledTimes(1);
  // });

  it('should navigate to members page when save button clicked', () => {
    updateForm("test", "test", "testTitle", "testTeam", "testStatus");
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.btnSave');
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
