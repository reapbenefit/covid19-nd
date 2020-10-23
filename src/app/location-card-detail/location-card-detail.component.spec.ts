import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCardDetailComponent } from './location-card-detail.component';

describe('LocationCardDetailComponent', () => {
  let component: LocationCardDetailComponent;
  let fixture: ComponentFixture<LocationCardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationCardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
