import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountantService } from './accountantService';
import { CalculatedField } from "./calculated-field/calculated-field";
import { LoanList } from "./loan-list/loan-list";
import { Utility } from './utility';
import { InterestList } from "./interest-list/interest-list";
import { PerPaymentGraph } from './per-payment-graph/per-payment-graph';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalculatedField, LoanList, InterestList, PerPaymentGraph],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('Economia');
  accountantService = inject(AccountantService);
  util = Utility;
}
