import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPicker } from './number-picker';

describe('NumberPicker', () => {
  let component: NumberPicker;
  let fixture: ComponentFixture<NumberPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
