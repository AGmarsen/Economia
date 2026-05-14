import { Component, inject, input } from '@angular/core';
import { AccountantService } from '../accountantService';

@Component({
  selector: 'calculated-field',
  imports: [],
  template: '<p>{{ label() }}: {{ accountantService.loanAmount() }}</p>',
})
export class CalculatedField {
  label = input<string>('');
  accountantService = inject(AccountantService);

}
