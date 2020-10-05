import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BannerComponent } from './banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppService } from '../services/app.service';
import { RouterTestingModule } from '@angular/router/testing';
import {of} from 'rxjs';

class AppServiceMock {
  username:string = 'admin';
  constructor(){}
}
class NavigateMock {
  constructor(){}
  navigate() { return of({});}
}

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let appService;
  let routeService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        {
          provide: Router,
          useValue: new NavigateMock()
        },
        { provide: AppService, useValue: new AppServiceMock() }  
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    appService = TestBed.get(AppService);
    routeService = TestBed.get(Router);
  });

  it('should create Banner component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page when clicked on logout', () => {
    appService.username = 'admin';
    expect(appService.username).toBe("admin");

    const logout = fixture.debugElement.nativeElement.querySelector('.logout');
    const routerSpy = spyOn(routeService , 'navigate');
    logout.click();
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalledTimes(1);
  });
});
