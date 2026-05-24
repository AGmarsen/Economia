import { Component, inject } from '@angular/core';
import { AccountantService } from '../accountantService';
import { Utility } from '../utility';

@Component({
  selector: 'loan-list',
  imports: [],
  templateUrl: './loan-list.html'
})
export class LoanList {
  accountantService = inject(AccountantService);
  util = Utility;
}
