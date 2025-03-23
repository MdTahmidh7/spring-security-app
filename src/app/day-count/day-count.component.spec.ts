import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCountComponent } from './day-count.component';

describe('DayCountComponent', () => {
  let component: DayCountComponent;
  let fixture: ComponentFixture<DayCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
