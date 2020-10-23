import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterpageComponent } from './filterpage.component';

describe('FilterpageComponent', () => {
  let component: FilterpageComponent;
  let fixture: ComponentFixture<FilterpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
