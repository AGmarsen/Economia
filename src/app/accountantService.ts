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
    this.downPayment = this.roundToCurrency(downPayment);
  }
  getDownPayment(): number {
    return this.downPayment;
  }

  setPurchasePrice(price: number) {
    this.purchasePrice = this.roundToCurrency(price);
  }
  getPurchasePrice(): number {
    return this.purchasePrice;
  }

  calculateLoans() {
    this._totalLoan.set(this.roundToCurrency(this.purchasePrice - this.downPayment));
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

  calculateTotalCoverage(): number {
    const totalCovered = this.loans().reduce((acc, loan) => acc + loan.coverage, this._downPaymentPercentage());
    return totalCovered > 1 ? 1 : totalCovered;
  }

  // Utililites

  roundToCurrency(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  saveToLocalStorage() {
    const data = {
      downPayment: this.downPayment,
      purchasePrice: this.purchasePrice
    };
    localStorage.setItem('accountantData', JSON.stringify(data));
  }

  loadFromLocalStorage() {
    const dataString = localStorage.getItem('accountantData');
    if (dataString) {
      const data = JSON.parse(dataString);
      this.setDownPayment(data.downPayment);
      this.setPurchasePrice(data.purchasePrice)
    }
  }

}
