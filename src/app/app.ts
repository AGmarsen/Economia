import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Parameter } from './parameter/parameter';
import { AccountantService } from './accountantService';
import { CalculatedField } from "./calculated-field/calculated-field";
import { LoanList } from "./loan-list/loan-list";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Parameter, CalculatedField, LoanList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Economia');
  accountantService = inject(AccountantService);
}
