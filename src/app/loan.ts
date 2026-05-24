export class Loan {
    private readonly monthlyInterestRate: number;
    coverage: number = 0;
    constructor(public label: string, public amount: number, public interestRate: number) {
        this.monthlyInterestRate = interestRate / 100 / 12;
    }

    calculateMonthlyPayment(loanTermYears: number): number {
      const numberOfPayments = loanTermYears * 12;
      if (this.amount <= 0 || numberOfPayments < 0) {
        return 0;
      }
      // m = A * (r * (1 + r)^n) / ((1 + r)^n - 1)
      return this.amount * (this.monthlyInterestRate * Math.pow(1 + this.monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + this.monthlyInterestRate, numberOfPayments) - 1);
    }

    calculateLoanTermYears(monthlyPayment: number): number {
      if (this.amount <= 0) {
        return 0;
      }
      if (monthlyPayment <= 0) {
        return Infinity;
      }
      // n = -log(1 - r * A / m) / log(1 + r)
      const loanTermMonths = -Math.log(1 - this.monthlyInterestRate * this.amount / monthlyPayment) / Math.log(1 + this.monthlyInterestRate);
      return loanTermMonths / 12;
    }

    calculateInterestOnlyPayment(interestAppliedBeforePayment=true): number {
        if (interestAppliedBeforePayment) {
            // m = A * r
            return this.amount * (this.monthlyInterestRate);
        }
        // m = A - A / (1 + r)
        return this.amount - this.amount / (1 + this.monthlyInterestRate);
    }
}
