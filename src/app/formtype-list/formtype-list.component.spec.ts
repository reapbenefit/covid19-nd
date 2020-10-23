import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtypeListComponent } from './formtype-list.component';

describe('FormtypeListComponent', () => {
  let component: FormtypeListComponent;
  let fixture: ComponentFixture<FormtypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormtypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
