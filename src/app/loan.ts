import { signal } from "@angular/core";

export class Loan {

    private _coverage = signal(0);
    coverage = this._coverage.asReadonly();

    private _loanTermYears = signal(0);
    loanTermYears = this._loanTermYears.asReadonly();

    private _monthlyPayment = signal(0);
    monthlyPayment = this._monthlyPayment.asReadonly();


    constructor(public label: string, private amount: number, private interestRate: number) { }

    private monthlyInterestRate(): number {
        return this.interestRate / 12;
    }

    setAmount(amount: number) {
        this.amount = amount;
        this.calcMonthlyPayment();
    }
    getAmount(): number {
        return this.amount;
    }

    setInterestRate(interestRate: number) {
        this.interestRate = interestRate;
        this.calcMonthlyPayment();
    }
    getInterestRate(): number {
        return this.interestRate;
    }

    setCoverage(coverage: number) {
        this._coverage.set(coverage);
    }

    setLoanTermYears(loanTermYears: number) {
        this._loanTermYears.set(loanTermYears);
        this.calcMonthlyPayment();
    }
    calcLoanTermYears() {
      if (this.amount <= 0) {
        this._loanTermYears.set(0);
        return;
      }
      if (this.monthlyPayment() <= 0) {
        this._loanTermYears.set(Infinity);
        return;
      }
      // n = -log(1 - r * A / m) / log(1 + r)
      const loanTermMonths = -Math.log(1 - this.monthlyInterestRate() * this.amount / this.monthlyPayment()) / Math.log(1 + this.monthlyInterestRate());
      this._loanTermYears.set(loanTermMonths / 12);
    }

    setMonthlyPayment(monthlyPayment: number) {
        this._monthlyPayment.set(monthlyPayment);
        this.calcLoanTermYears();
    }
    calcMonthlyPayment() {
      const numberOfPayments = this.loanTermYears() * 12;
      if (this.amount <= 0 || numberOfPayments < 0) {
        this._monthlyPayment.set(0);
        return;
      }
      // m = A * (r * (1 + r)^n) / ((1 + r)^n - 1)
      const m = this.amount * (this.monthlyInterestRate() * Math.pow(1 + this.monthlyInterestRate(), numberOfPayments)) / (Math.pow(1 + this.monthlyInterestRate(), numberOfPayments) - 1)
      this._monthlyPayment.set(m);
    }

    getInterestOnlyPayment(interestAppliedBeforePayment=true): number {
        if (interestAppliedBeforePayment) {
            // m = A * r
            return this.amount * (this.monthlyInterestRate());
        }
        // m = A - A / (1 + r)
        return this.amount - this.amount / (1 + this.monthlyInterestRate());
    }

    getPerPaymentStats(): { payment: number; interest: number; remaining: number }[] {
        let numberOfPayments = this.loanTermYears() * 12;
        if (numberOfPayments <= 0) {
            return [];
        }
        if (numberOfPayments === Infinity) {
            numberOfPayments = 1200;
        }
        let remainingAmount = this.amount;
        const monthlyInterestRate = this.monthlyInterestRate();
        const monthlyPayment = this.monthlyPayment();
        const stats : { payment: number; interest: number; remaining: number }[] = [];

        for (let i = 0; i < numberOfPayments; i++) {
            let interest = remainingAmount * monthlyInterestRate;
            remainingAmount += interest;
            remainingAmount -= monthlyPayment;
            stats.push({
                payment: monthlyPayment,
                interest: interest,
                remaining: remainingAmount
            });
        }
        return stats;
    }
}
