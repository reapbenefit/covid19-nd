import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SniscoreComponent } from './sniscore.component';

describe('SniscoreComponent', () => {
  let component: SniscoreComponent;
  let fixture: ComponentFixture<SniscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SniscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SniscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
