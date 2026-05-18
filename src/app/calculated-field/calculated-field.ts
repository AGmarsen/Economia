import { Component, input } from '@angular/core';

@Component({
  selector: 'calculated-field',
  imports: [],
  template: `
  <div class="calculated-field">
    <p>{{ label() }}: {{ value() }}</p>
  </div>
  `,
})
export class CalculatedField {
  label = input<string>('');
  value = input<number>(0);
}
