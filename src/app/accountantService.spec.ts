import { TestBed } from '@angular/core/testing';

import { AccountantService } from './accountantService';

describe('Accountant', () => {
  let service: AccountantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate the loan amount', () => {
    let downPayment = Math.random();
    let extra = Math.random();
    if (extra === 0) {
      extra = 0.1;
    }
    let purchasePrice = downPayment + extra;
    service.setDownPayment(downPayment);
    service.setPurchasePrice(purchasePrice);
    service.calculateLoans();
    expect(service.totalLoan()).toBe(extra);
  });

  it('should have sum of loans should equal total loan amount', () => {
    let downPayment = Math.random();
    let purchasePrice = downPayment + Math.random();
    service.setDownPayment(downPayment);
    service.setPurchasePrice(purchasePrice);
    service.calculateLoans();
    expect(service.totalLoan()).toEqual(service.loans().reduce((total, loan) => total + loan.amount, 0));
  });

});
