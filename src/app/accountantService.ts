import { Injectable, signal } from '@angular/core';
import { Loan } from './loan';

@Injectable({
  providedIn: 'root',
})
export class AccountantService {

  // top levelparameters
  private downPayment: number = 0;
  private purchasePrice: number = 0;

  private totalLoan = signal(0);
  loanAmount = this.totalLoan.asReadonly();

  private _loans = signal<Loan[]>([]);
  loans = this._loans.asReadonly();

  // how much of the total loan is covered by [downPayement, loan1, loan2, ...]
  private _coverPercentages = signal<number[]>([]);
  coverPercentages = this._coverPercentages.asReadonly();

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

  setPurchasePrice(price: number) {
    this.purchasePrice = this.roundToCurrency(price);
    this.calculateLoan();
  }
  getPurchasePrice(): number {
    return this.purchasePrice;
  }

  calculateLoan() {
    this.totalLoan.set(this.roundToCurrency(this.purchasePrice - this.downPayment));
    if (this.coverPercentages().length === 0) {
      const downPaymentCovered = this.downPayment / this.purchasePrice;
      this._coverPercentages.set([downPaymentCovered, 1 - downPaymentCovered]);
    }
    const loans = this.coverPercentages().map(cover =>
      new Loan(`Loan ${this._loans().length + 1}`, this.roundToCurrency(this.totalLoan() * cover), 0));
    this._loans.set(loans);
  }

  loanCovered(): boolean {
    const totalCovered = this.loans().reduce((acc, loan) => acc + loan.amount, this.downPayment);
    return totalCovered - this.purchasePrice >= 0;
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
