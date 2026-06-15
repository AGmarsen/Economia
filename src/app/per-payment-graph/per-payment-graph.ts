import { Component, inject, input, computed } from '@angular/core';
import { AccountantService } from '../accountantService';
import { Utility } from '../utility';
import { CalculatedField } from '../calculated-field/calculated-field';
import { Loan } from '../loan';

@Component({
  selector: 'per-payment-graph',
  imports: [CalculatedField],
  templateUrl: './per-payment-graph.html',
})
export class PerPaymentGraph {
  accountantService = inject(AccountantService);
  util = Utility;

  loan = input<Loan>();

  yearlyStats = computed(() => {
    const loan = this.loan();
    return loan ? this.getYearlyStats(loan) : [];
  });

  monthRemainder = computed(() => {
    const loanData = this.loan();
    if (!loanData) return 0;
    return loanData.getPerPaymentStats().length % 12 || 0;
  });

  totalInterest = computed(() => {
    const loanData = this.loan();
    if (!loanData) return 0;
    return loanData.getPerPaymentStats().reduce((sum, stat) => sum + stat.interest, 0);
  });

  totalPayment = computed(() => {
    const loanData = this.loan();
    if (!loanData) return 0;
    return loanData.getPerPaymentStats().reduce((sum, stat) => sum + stat.payment, 0);
  });

  

  //aggregate monthly stats to yearly stats
  getYearlyStats(loan: Loan): { payment: number, interest: number, remaining: number }[] {
    const stats : { payment: number, interest: number, remaining: number }[] = [];
    const monthlyStats = loan.getPerPaymentStats();
    if (!monthlyStats) return [];

    for (let i = 0; i < monthlyStats.length; i += 12) {
      const oneYearStats = monthlyStats.slice(i, i + 12);
      const payment = oneYearStats.reduce((sum, stat) => sum + stat.payment, 0);
      const interest = oneYearStats.reduce((sum, stat) => sum + stat.interest, 0);
      const remaining = oneYearStats[oneYearStats.length - 1].remaining;
      stats.push({ payment, interest, remaining });
    }

    return stats;
  }
  
}
