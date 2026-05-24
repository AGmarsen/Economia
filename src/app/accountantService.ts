import { Injectable, signal } from '@angular/core';
import { Loan } from './loan';

@Injectable({
  providedIn: 'root',
})
export class AccountantService {

  // top levelparameters
  private downPayment: number = 0;
  private purchasePrice: number = 0;

  private _totalLoan = signal(0);
  totalLoan = this._totalLoan.asReadonly();

  private _downPaymentPercentage = signal(0);
  downPaymentPercentage = this._downPaymentPercentage.asReadonly();

  private _loans = signal<Loan[]>([]);
  loans = this._loans.asReadonly();

  constructor() {
    this.loadFromLocalStorage();
  }

  setDownPayment(downPayment: number) {
    this.downPayment = downPayment;
    this.calculateLoans();
    this.saveToLocalStorage();
  }
  getDownPayment(): number {
    return this.downPayment;
  }

  setPurchasePrice(price: number) {
    this.purchasePrice = price;
    this.calculateLoans();
    this.saveToLocalStorage();
  }
  getPurchasePrice(): number {
    return this.purchasePrice;
  }

  calculateLoans() {
    this._totalLoan.set(this.purchasePrice - this.downPayment);
    this._downPaymentPercentage.set(this.downPayment / this.purchasePrice);
    if (this.loans().length === 0 && this.totalLoan() > 0) {
      this.addLoan();
    }
    this.loans().forEach(loan => loan.calculateAndSetAmount(this.totalLoan()));
  }

  addLoan() {
    let missingAmount = this.totalLoan() * (1 - this.calculateTotalCoverage());
    if (missingAmount <= 0) {
      missingAmount = 0;
    }
    let newLoan = new Loan(`Loan ${this._loans().length + 1}`, missingAmount, 0);
    newLoan.calculateAndSetCoverage(this.totalLoan());
    this._loans.set([...this.loans(), newLoan]);
  }

  removeLoan(loanToRemove: Loan) {
    this._loans.set(this.loans().filter(loan => loan !== loanToRemove));
  }

  calculateTotalCoverage(): number {
    const totalCovered = this.loans().reduce((acc, loan) => acc + loan.coverage, this._downPaymentPercentage());
    return totalCovered > 1 ? 1 : totalCovered;
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
      if (data.loans && Array.isArray(data.loans)) {
        const loadedLoans = data.loans.map((loanData: any) => {
          const loan = new Loan(loanData.label, loanData.amount, loanData.interestRate);
          loan.calculateAndSetCoverage(this.totalLoan());
          return loan;
        });
        this._loans.set(loadedLoans);
      } else {
        this._loans.set([]);
      }
    }
  }

}
