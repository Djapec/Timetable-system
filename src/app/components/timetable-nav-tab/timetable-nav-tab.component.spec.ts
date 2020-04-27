import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableNavTabComponent } from './timetable-nav-tab.component';

describe('TimetableComponent', () => {
  let component: TimetableNavTabComponent;
  let fixture: ComponentFixture<TimetableNavTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableNavTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableNavTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
