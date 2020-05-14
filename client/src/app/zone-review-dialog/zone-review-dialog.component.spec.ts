import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneReviewDialogComponent } from './zone-review-dialog.component';

describe('ZoneReviewDialogComponent', () => {
  let component: ZoneReviewDialogComponent;
  let fixture: ComponentFixture<ZoneReviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneReviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
