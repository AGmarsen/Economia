import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerPaymentGraph } from './per-payment-graph';

describe('PerPaymentGraph', () => {
  let component: PerPaymentGraph;
  let fixture: ComponentFixture<PerPaymentGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerPaymentGraph],
    }).compileComponents();

    fixture = TestBed.createComponent(PerPaymentGraph);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
