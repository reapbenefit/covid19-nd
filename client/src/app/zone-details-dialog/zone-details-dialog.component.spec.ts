import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneDetailsDialogComponent } from './zone-details-dialog.component';

describe('ZoneDetailsDialogComponent', () => {
  let component: ZoneDetailsDialogComponent;
  let fixture: ComponentFixture<ZoneDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
