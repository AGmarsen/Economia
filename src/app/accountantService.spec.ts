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
    let investmentSum = downPayment + Math.random();
    service.setDownPayment(downPayment);
    service.setInvestmentSum(investmentSum);
    service.calculateLoan();
    expect(service.loanAmount()).toBeGreaterThan(0);
  });

  it('should cover total loan with mortgage plus bank loan', () => {
    let downPayment = Math.random();
    let investmentSum = downPayment + Math.random();
    service.setDownPayment(downPayment);
    service.setInvestmentSum(investmentSum);
    service.calculateLoan();
    expect(service.loanAmount()).toEqual(service.bankLoan() + service.mortgageLoan());
  });
});
