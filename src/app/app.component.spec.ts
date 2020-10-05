import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { APP_BASE_HREF } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AppService } from './services/app.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {of} from 'rxjs';

class AppServiceMock {
  username: string = "";
  constructor(){}
  setUsername(name:string) {return of({});}
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, BannerComponent],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: AppService, useValue: new AppServiceMock() }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    appService = TestBed.get(AppService);
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

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'softrams-racing'`, async(() => {
    expect(component.title).toEqual('softrams-racing');
  }));

  it('should set a username', () => {
    appService.username = "";
    const memberSpy = spyOn(appService , 'setUsername');
    appService.setUsername("admin");
    expect(memberSpy).toHaveBeenCalledTimes(1);
  });
});
