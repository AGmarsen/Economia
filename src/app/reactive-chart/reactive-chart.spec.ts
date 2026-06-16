import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveChart } from './reactive-chart';

describe('ReactiveChart', () => {
  let component: ReactiveChart;
  let fixture: ComponentFixture<ReactiveChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveChart],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
