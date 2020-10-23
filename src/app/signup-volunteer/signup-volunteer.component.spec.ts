import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupVolunteerComponent } from './signup-volunteer.component';

describe('SignupVolunteerComponent', () => {
  let component: SignupVolunteerComponent;
  let fixture: ComponentFixture<SignupVolunteerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupVolunteerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
