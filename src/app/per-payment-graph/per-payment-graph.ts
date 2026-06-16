import { Component, inject, input, computed, effect, ViewChild, ElementRef } from '@angular/core';
import { AccountantService } from '../accountantService';
import { Utility } from '../utility';
import { CalculatedField } from '../calculated-field/calculated-field';
import { ReactiveChart } from '../reactive-chart/reactive-chart';
import { Loan } from '../loan';

@Component({
  selector: 'per-payment-graph',
  imports: [CalculatedField, ReactiveChart],
  templateUrl: './per-payment-graph.html',
})

export class PerPaymentGraph {
  accountantService = inject(AccountantService);
  util = Utility;

  loan = input.required<Loan>();
  private perPaymentStats = computed(() => {
    return this.loan().getPerPaymentStats();
  });
  private yearlyStats = computed(() => {
    return this.getYearlyStats(this.perPaymentStats());
  });

  totalInterest = computed(() => {
    return this.perPaymentStats()
      .reduce((sum, stat) => sum + stat.interest, 0);
  });

  totalPayment = computed(() => {
    return this.perPaymentStats()
      .reduce((sum, stat) => sum + stat.payment, 0);
  });

  burnDownchartData = computed(() => {
    const stats = this.yearlyStats();
    const labels = stats.map((_, index) => `Year ${index + 1}`);
    const monthRemainder = this.perPaymentStats().length % 12;
    if (monthRemainder !== 0) {
      labels[labels.length - 1] += ` (${monthRemainder} months)`;
    }

    return {
      labels,
      datasets: this.burndownDatasets(stats)
    };
  });

  accumulatedChartData = computed(() => {
    const stats = this.yearlyStats();
    const labels = stats.map((_, index) => `Year ${index + 1}`);
    const monthRemainder = this.perPaymentStats().length % 12;
    if (monthRemainder !== 0) {
      labels[labels.length - 1] += ` (${monthRemainder} months)`;
    }

    return {
      labels,
      datasets: this.accumulatedStats(stats.map(s => ({ interest: s.interest, payment: s.payment })))
    };
  });

  //aggregate monthly stats to yearly stats
  getYearlyStats(monthlyStats: { payment: number, interest: number, remaining: number }[]): { payment: number, interest: number, remaining: number }[] {
    const stats: { payment: number, interest: number, remaining: number }[] = [];

    for (let i = 0; i < monthlyStats.length; i += 12) {
      const oneYearStats = monthlyStats.slice(i, i + 12);
      const payment = oneYearStats.reduce((sum, stat) => sum + stat.payment, 0);
      const interest = oneYearStats.reduce((sum, stat) => sum + stat.interest, 0);
      const remaining = oneYearStats[oneYearStats.length - 1].remaining;
      stats.push({ payment, interest, remaining });
    }

    return stats;
  }

  burndownDatasets(stats: { payment: number, interest: number, remaining: number }[]) {
    return [
      {
        label: 'Payment',
        data: stats.map(s => s.payment),
        borderColor: 'blue',
        backgroundColor: 'lightblue',
      },
      {
        label: 'Interest',
        data: stats.map(s => s.interest),
        borderColor: 'red',
        backgroundColor: 'pink',
      },
      {
        label: 'Remaining',
        data: stats.map(s => s.remaining),
        borderColor: 'green',
        backgroundColor: 'lightgreen',
      }
    ];
  }

  accumulatedStats(stats: { payment: number, interest: number }[]) {
    let accumulatedInterest = 0;
    let accumulatedPayment = 0;
    return [
      {
        label: 'Accumulated Interest',
        data: stats.map(s => {
          accumulatedInterest += s.interest;
          return accumulatedInterest;
        }),
        borderColor: 'orange',
        backgroundColor: 'lightorange',
      },
      {
        label: 'Accumulated Payment',
        data: stats.map(s => {
          accumulatedPayment += s.payment;
          return accumulatedPayment;
        }),
        borderColor: 'purple',
        backgroundColor: 'lavender',
      }
    ];

  }
}
