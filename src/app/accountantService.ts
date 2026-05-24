import { Injectable, signal } from '@angular/core';
import { Loan } from './loan';

@Injectable({
  providedIn: 'root',
})
export class AccountantService {

  private purchasePrice: number = 0;

  private _downPayment = signal(0);
  downPayment = this._downPayment.asReadonly();

  private _downPaymentCoverage = signal(0);
  downPaymentCoverage = this._downPaymentCoverage.asReadonly();

  private _loans = signal<Loan[]>([]);
  loans = this._loans.asReadonly();

  constructor() {
    this.loadFromLocalStorage();
  }

  setPurchasePrice(price: number) {
    this.purchasePrice = price;
    this.calcDownPaymentCoverage();
    this.loans().forEach(loan => this.calcLoanAmount(loan));
    this.saveToLocalStorage();
  }
  getPurchasePrice(): number {
    return this.purchasePrice;
  }

  setDownPayment(downPayment: number) {
    this._downPayment.set(downPayment);
    this.calcDownPaymentCoverage();
    this.saveToLocalStorage();
  }
  private calcDownPayment() {
    const calculatedDownPayment = this.purchasePrice * this._downPaymentCoverage();
    this._downPayment.set(calculatedDownPayment);
  }

  setDownPaymentCoverage(coverage: number) {
    this._downPaymentCoverage.set(coverage);
    this.calcDownPayment();
  }
  private calcDownPaymentCoverage() {
    const calculatedCoverage = this.purchasePrice <= 0 ? 1 : this._downPayment() / this.purchasePrice;
    this._downPaymentCoverage.set(calculatedCoverage);
  }

  setLoanAmount(loan: Loan, amount: number) {
    loan.amount = amount;
    this.calcLoanCoverage(loan);
    this.saveToLocalStorage();
  }
  private calcLoanAmount(loan: Loan) {
    const calculatedAmount = this.purchasePrice * loan.coverage;
    loan.amount = calculatedAmount;
  }

  setLoanCoverage(loan: Loan, coverage: number) {
    loan.coverage = coverage;
    this.calcLoanAmount(loan);
    this.saveToLocalStorage();
  }
  private calcLoanCoverage(loan: Loan) {
    const calculatedCoverage = this.purchasePrice <= 0 ? 1 : loan.amount / this.purchasePrice;
    loan.coverage = calculatedCoverage;
  }

  addLoan() {
    let newLoan = new Loan(`Loan ${this._loans().length + 1}`, 0, 0);
    let missingAmount = this.purchasePrice - this.loans().reduce((total, loan) => total + loan.amount, this.downPayment());
    if (missingAmount <= 0) {
      missingAmount = 0;
    }
    this.setLoanAmount(newLoan, missingAmount);
    this._loans.set([...this.loans(), newLoan]);
  }

  removeLoan(loanToRemove: Loan) {
    this._loans.set(this.loans().filter(loan => loan !== loanToRemove));
  }

  saveToLocalStorage() {
    const data = {
      downPayment: this.downPayment,
      purchasePrice: this.purchasePrice,
      loans: this.loans().map(loan => ({ label: loan.label, amount: loan.amount, interestRate: loan.interestRate }))
    };
    localStorage.setItem('accountantData', JSON.stringify(data));
  }

  loadFromLocalStorage() {
    const dataString = localStorage.getItem('accountantData');
    if (dataString) {
      const data = JSON.parse(dataString);
      this.setDownPayment(data.downPayment);
      this.setPurchasePrice(data.purchasePrice);
    }
  }

}
