import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfunctionComponent } from './addfunction.component';

describe('AddfunctionComponent', () => {
  let component: AddfunctionComponent;
  let fixture: ComponentFixture<AddfunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddfunctionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
