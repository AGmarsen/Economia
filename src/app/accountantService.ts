import { Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';

// Handles all the economic math
@Injectable({
  providedIn: 'root',
})
export class AccountantService {
  // parameters
  private downPayment: number = 0;
  private investmentSum: number = 0;
  private bankLoanInterestRate: number = 0;
  private mortgageLoanInterestRate: number = 0;
  private loanTermYears: number = 0;

  // calculated values
  private _loanAmount = signal<number>(0);
  loanAmount = this._loanAmount.asReadonly();

  private _mortgageCover = signal<number>(0.8);
  mortgageCover = this._mortgageCover.asReadonly();
  
  private _bankLoan = signal<number>(0);
  bankLoan = this._bankLoan.asReadonly();
  
  private _mortgageLoan = signal<number>(0);
  mortgageLoan = this._mortgageLoan.asReadonly();

  constructor() {
    this.loadFromLocalStorage();
  }

  setDownPayment(downPayment: number) {
    this.downPayment = this.roundToCurrency(downPayment);
    this.calculateLoan();
  }
  getDownPayment(): number {
    return this.downPayment;
  }

  setInvestmentSum(sum: number) {
    this.investmentSum = this.roundToCurrency(sum);
    this.calculateLoan();
  }
  getInvestmentSum(): number {
    return this.investmentSum;
  }

  calculateLoan() {
    this._loanAmount.set(this.roundToCurrency(this.investmentSum - this.downPayment));
    this._mortgageLoan.set(Math.min(this._loanAmount(), this.roundToCurrency(this.investmentSum * this._mortgageCover())));
    this._bankLoan.set(this.roundToCurrency(this._loanAmount() - this._mortgageLoan()));
    this.saveToLocalStorage();
  }
  getLoanAmount(): number {
    return this._loanAmount();
  }

  setBankLoanInterestRate(rate: number) {
    this.bankLoanInterestRate = rate;
  }
  getBankLoanInterestRate(): number {
    return this.bankLoanInterestRate;
  }

  setMortgageLoanInterestRate(rate: number) {
    this.mortgageLoanInterestRate = rate;
  }
  getMortgageLoanInterestRate(): number {
    return this.mortgageLoanInterestRate;
  }

  setLoanTerm(term: number) {
    this.loanTermYears = term;
  }
  getLoanTerm(): number {
    return this.loanTermYears;
  }



  // Utililites

  roundToCurrency(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  saveToLocalStorage() {
    const data = {
      downPayment: this.downPayment,
      investmentSum: this.investmentSum,
      loanAmount: this._loanAmount(),
      mortgageLoan: this._mortgageLoan(),
      bankLoan: this._bankLoan(),
      mortgageCover: this._mortgageCover(),
      bankLoanInterestRate: this.bankLoanInterestRate,
      mortgageLoanInterestRate: this.mortgageLoanInterestRate,
      loanTermYears: this.loanTermYears
    };
    localStorage.setItem('accountantData', JSON.stringify(data));
  }

  loadFromLocalStorage() {
    const dataString = localStorage.getItem('accountantData');
    if (dataString) {
      const data = JSON.parse(dataString);
      this.setDownPayment(data.downPayment);
      this.setInvestmentSum(data.investmentSum);
      this.setBankLoanInterestRate(data.bankLoanInterestRate);
      this.setMortgageLoanInterestRate(data.mortgageLoanInterestRate);
      this.setLoanTerm(data.loanTermYears);
    }
  }

}
