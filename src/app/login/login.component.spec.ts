import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { HttpClient } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrModule} from 'ngx-toastr';
import {of} from 'rxjs';

class NavigateMock {
  constructor(){}
  navigate() { return of({});}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routeService;

  const updateForm = (username, password) => {
    fixture.componentInstance.loginForm.controls['username'].setValue(username);
    fixture.componentInstance.loginForm.controls['password'].setValue(password);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterModule, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        {
          provide: Router,
          useValue: new NavigateMock()
        },
        HttpClient
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('Should set local storage value when form submitted', () => {
    updateForm("admin", "admin");
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    const username = JSON.parse(localStorage.getItem("username"));
    expect(username.username).toBe('admin');
  });

  it('should set an Item', () => {
    let value = 'bar';
    localStorage.setItem('foo', value); // bar
    expect(localStorage.getItem('foo')).toBe('bar'); // bar
  });

  it('should remove Item', () => {
    let value = 'bar';
    localStorage.setItem('foo', value); // bar
    expect(localStorage.removeItem('foo')).toBeUndefined(); // undefined
    expect(localStorage.getItem('foo')).toBeNull(); // null
  });

  it("should navigate to member's page when add button clicked", () => {
    updateForm("admin", "admin");
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    const routerSpy = spyOn(routeService , 'navigate');
    button.click();
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledTimes(1);
  });

  afterEach(() => { (2)
    routeService = null;
    localStorage.clear();
  });
});

