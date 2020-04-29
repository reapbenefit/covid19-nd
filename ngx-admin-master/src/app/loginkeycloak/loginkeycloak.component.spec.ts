import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginkeycloakComponent } from './loginkeycloak.component';

describe('LoginkeycloakComponent', () => {
  let component: LoginkeycloakComponent;
  let fixture: ComponentFixture<LoginkeycloakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginkeycloakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginkeycloakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
