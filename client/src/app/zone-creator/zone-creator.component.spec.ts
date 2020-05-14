import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneCreatorComponent } from './zone-creator.component';

describe('ZoneCreatorComponent', () => {
  let component: ZoneCreatorComponent;
  let fixture: ComponentFixture<ZoneCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
