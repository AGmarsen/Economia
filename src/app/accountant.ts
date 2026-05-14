import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Accountant {
  accountBalance: number = 0;
  investmentSum: number = 0;

  setBalance(balance: number) {
    this.accountBalance = balance;
  }

  setInvestmentSum(sum: number) {
    this.investmentSum = sum;
  }

  calculateLoan() {
    return this.investmentSum - this.accountBalance;
  }

}
