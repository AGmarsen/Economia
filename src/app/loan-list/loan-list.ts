import { Component, inject } from '@angular/core';
import { AccountantService } from '../accountantService';
import { Parameter } from "../parameter/parameter";

@Component({
  selector: 'loan-list',
  imports: [Parameter],
  templateUrl: './loan-list.html',
})
export class LoanList {
  accountantService = inject(AccountantService);
}
