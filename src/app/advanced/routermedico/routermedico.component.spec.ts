import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutermedicoComponent } from './routermedico.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, empty, Subject } from 'rxjs';

 class FakeRouter {
  navigate (params) {
  }
}
class FakeActivatedRoute {
  //params: Observable<any> = empty();
  private subject = new Subject();
  send(id) {
    this.subject.next(id);
  }
  get params() {
    return this.subject.asObservable();
  }
}

describe('RoutermedicoComponent', () => {
  let component: RoutermedicoComponent;
  let fixture: ComponentFixture<RoutermedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutermedicoComponent ],
      providers:[
        {provide: Router, useClass: FakeRouter},
        {provide: ActivatedRoute, useClass: FakeActivatedRoute}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutermedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should redirect towards medico when the function saveDoctor is triggered',() => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.saveDoctor();
    expect(spy).toHaveBeenCalledWith(['medico', '123']);
  });

  it('Check the value sent in the params activatedRoute', () => {
    //this copuld be used when you need to acces to a property
    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.send({id:'nuevo'});
    component.ngOnInit();
    const  idc = component.id;
    expect(idc).toBe('nuevo');
  });
});
