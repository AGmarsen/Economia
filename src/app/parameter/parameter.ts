import { Component, input } from '@angular/core';

@Component({
  selector: 'parameter',
  imports: [],
  template: `
    <div class="">
      <p>{{label()}}</p>
      <input class="manual-input" type="number" placeholder="Enter {{ label() }}">
    </div>
  `,
})
export class Parameter {
  label = input<string>('Label');
  value: number = 0;
}
