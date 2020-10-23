import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMapContentComponent } from './mobile-map-content.component';

describe('MobileMapContentComponent', () => {
  let component: MobileMapContentComponent;
  let fixture: ComponentFixture<MobileMapContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileMapContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMapContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
