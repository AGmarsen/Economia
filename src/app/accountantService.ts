import { Injectable, signal } from '@angular/core';
import { Loan } from './loan';

@Injectable({
  providedIn: 'root',
})
export class AccountantService {

  private readonly storage = window.sessionStorage;

  private purchasePrice: number = 0;

  private _downPayment = signal(0);
  downPayment = this._downPayment.asReadonly();

  private _downPaymentCoverage = signal(0);
  downPaymentCoverage = this._downPaymentCoverage.asReadonly();

  private _loans = signal<Loan[]>([]);
  loans = this._loans.asReadonly();

  constructor() {
    this.loadFromStorage();
  }

  setPurchasePrice(price: number) {
    this.purchasePrice = price;
    this.calcDownPaymentCoverage();
    this.loans().forEach(loan => this.calcLoanAmount(loan));
    this.saveToStorage();
  }
  getPurchasePrice(): number {
    return this.purchasePrice;
  }

  setDownPayment(downPayment: number) {
    this._downPayment.set(downPayment);
    this.calcDownPaymentCoverage();
    this.saveToStorage();
  }
  private calcDownPayment() {
    const calculatedDownPayment = this.purchasePrice * this._downPaymentCoverage();
    this._downPayment.set(calculatedDownPayment);
  }

  setDownPaymentCoverage(coverage: number) {
    this._downPaymentCoverage.set(coverage);
    this.calcDownPayment();
    this.saveToStorage();
  }
  private calcDownPaymentCoverage() {
    const calculatedCoverage = this.purchasePrice <= 0 ? 1 : this._downPayment() / this.purchasePrice;
    this._downPaymentCoverage.set(calculatedCoverage);
  }

  setLoanAmount(loan: Loan, amount: number) {
    loan.setAmount(amount);
    this.calcLoanCoverage(loan);
    this.saveToStorage();
  }
  private calcLoanAmount(loan: Loan) {
    const calculatedAmount = this.purchasePrice * loan.coverage();
    loan.setAmount(calculatedAmount);
  }

  setLoanCoverage(loan: Loan, coverage: number) {
    loan.setCoverage(coverage);
    this.calcLoanAmount(loan);
    this.saveToStorage();
  }
  private calcLoanCoverage(loan: Loan) {
    const calculatedCoverage = this.purchasePrice <= 0 ? 1 : loan.getAmount() / this.purchasePrice;
    loan.setCoverage(calculatedCoverage);
  }

  addLoan() {
    let newLoan = new Loan(`Loan ${this._loans().length + 1}`, 0, 0);
    let missingAmount = this.purchasePrice - this.loans().reduce((total, loan) => total + loan.getAmount(), this.downPayment());
    if (missingAmount <= 0) {
      missingAmount = 0;
    }
    this.setLoanAmount(newLoan, missingAmount);
    this._loans.set([...this.loans(), newLoan]);
    this.saveToStorage();
  }

  removeLoan(loanToRemove: Loan) {
    this._loans.set(this.loans().filter(loan => loan !== loanToRemove));
    this.saveToStorage();
  }

  setLoanInterest(loan: Loan, interestRate: number) {
    loan.setInterestRate(interestRate);
    this.saveToStorage();
  }


  setLoanTermYears(loan: Loan, loanTermYears: number) {
    loan.setLoanTermYears(loanTermYears);
    this.saveToStorage();
  }

  setLoanPayment(loan: Loan, monthlyPayment: number) {
    loan.setMonthlyPayment(monthlyPayment);
    this.saveToStorage();
  }

  async saveToStorage() {
    const data = {
      purchasePrice: this.purchasePrice,
      downPayment: this._downPayment(),
      downPaymentCoverage: this._downPaymentCoverage(),
      loans: this.loans().map(loan => ({
        label: loan.label,
        amount: loan.getAmount(),
        interestRate: loan.getInterestRate(),
        coverage: loan.coverage(),
        loanTermYears: loan.loanTermYears(),
        monthlyPayment: loan.monthlyPayment()
      }))
    };
    this.storage.setItem('accountantData', JSON.stringify(data));
  }

  loadFromStorage() {
    const dataString = this.storage.getItem('accountantData');
    if (dataString) {
      const data = JSON.parse(dataString);
      this.purchasePrice = data.purchasePrice;
      this._downPayment.set(data.downPayment);
      this._downPaymentCoverage.set(data.downPaymentCoverage);
      this._loans.set(data.loans.map((loanData: any) => {
        const loan = new Loan(loanData.label, loanData.amount, loanData.interestRate);
        loan.setCoverage(loanData.coverage);
        loan.setLoanTermYears(loanData.loanTermYears);
        loan.setMonthlyPayment(loanData.monthlyPayment);
        return loan;
      }));
    }
  }

}
