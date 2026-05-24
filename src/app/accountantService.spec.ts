import { TestBed } from '@angular/core/testing';

import { AccountantService } from './accountantService';

describe('Accountant', () => {
  let service: AccountantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountantService);
    let downPayment = Math.random();
    let purchasePrice = downPayment + Math.random();
    service.setDownPayment(downPayment);
    service.setPurchasePrice(purchasePrice);
    service.addLoan();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have sum of loans and down payment equal total purchase price', () => {
    const total = service.loans().reduce((total, loan) => total + loan.getAmount(), service.downPayment());
    expect(total).toEqual(service.getPurchasePrice());
  });

  it('should ensure all coverages add up to 100%', () => {
    const totalCoverage = service.loans().reduce((total, loan) => total + loan.coverage(), service.downPaymentCoverage());
    expect(totalCoverage).toBeCloseTo(1, 10);
  });
});
