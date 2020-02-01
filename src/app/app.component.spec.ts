import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { RouterOutlet, RouterLink, RouterLinkWithHref } from '@angular/router';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tests'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('tests');
  }); 
  it('App component html should has a router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const appComponent = fixture.debugElement.componentInstance;
    const debugElement = fixture.debugElement.query(By.directive(RouterOutlet));
    console.log(DebugElement);
    expect(debugElement).toBeTruthy();
  });
});
