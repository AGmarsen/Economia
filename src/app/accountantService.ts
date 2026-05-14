import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountantService {
  private accountBalance: number = 0;
  private investmentSum: number = 0;

  private _loanAmount = signal<number>(0);
  loanAmount = this._loanAmount.asReadonly();


  setBalance(balance: number) {
    this.accountBalance = balance;
  }

  setInvestmentSum(sum: number) {
    this.investmentSum = sum;
  }

  calculateLoan() {
    this._loanAmount.set(this.investmentSum - this.accountBalance);
  }

}
