import { Injectable, signal } from '@angular/core';

// Handles all the economic math
@Injectable({
  providedIn: 'root',
})
export class AccountantService {
  private downPayment: number = 0;
  private investmentSum: number = 0;

  private _loanAmount = signal<number>(0);
  loanAmount = this._loanAmount.asReadonly();

  private _mortgageCover = signal<number>(0.8);
  mortgageCover = this._mortgageCover.asReadonly();
  
  private _bankLoan = signal<number>(0);
  bankLoan = this._bankLoan.asReadonly();
  
  private _mortgageLoan = signal<number>(0);
  mortgageLoan = this._mortgageLoan.asReadonly();

  private _bankLoanInterestRate = signal<number>(0);
  bankLoanInterestRate = this._bankLoanInterestRate.asReadonly();

  private _mortgageLoanInterestRate = signal<number>(0);
  mortgageLoanInterestRate = this._mortgageLoanInterestRate.asReadonly();

  private _loanTermYears = signal<number>(0);
  loanTermYears = this._loanTermYears.asReadonly();

  setDownPayment(downPayment: number) {
    this.downPayment = this.roundToCurrency(downPayment);
    this.calculateLoan();
  }

  setInvestmentSum(sum: number) {
    this.investmentSum = this.roundToCurrency(sum);
    this.calculateLoan();
  }

  calculateLoan() {
    this._loanAmount.set(this.roundToCurrency(this.investmentSum - this.downPayment));
    this._mortgageLoan.set(Math.min(this._loanAmount(), this.roundToCurrency(this.investmentSum * this._mortgageCover())));
    this._bankLoan.set(this.roundToCurrency(this._loanAmount() - this._mortgageLoan()));
  }

  setBankLoanInterestRate(rate: number) {
    this._bankLoanInterestRate.set(rate);
  }

  setMortgageLoanInterestRate(rate: number) {
    this._mortgageLoanInterestRate.set(rate);
  }

  setLoanTerm(term: number) {
    this._loanTermYears.set(term);
  }


  roundToCurrency(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

}
