import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatedField } from './calculated-field';

describe('CalculatedField', () => {
  let component: CalculatedField;
  let fixture: ComponentFixture<CalculatedField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatedField],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatedField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
