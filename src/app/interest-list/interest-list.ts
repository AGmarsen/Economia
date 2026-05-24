import { Component, inject } from '@angular/core';
import { AccountantService } from '../accountantService';
import { Utility } from '../utility';

@Component({
  selector: 'interest-list',
  imports: [],
  templateUrl: './interest-list.html'
})
export class InterestList {
  accountantService = inject(AccountantService);
  util = Utility;
}
