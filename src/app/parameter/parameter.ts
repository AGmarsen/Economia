import { Component, input, output } from '@angular/core';

@Component({
  selector: 'parameter',
  imports: [],
  template: `
    <div class="">
      <p>{{label()}}</p>
      <input class="manual-input" [value]="internalValue" type="number" placeholder="Enter {{ label() }}" (input)="parameterSet()">
    </div>
  `,
})
export class Parameter {
  label = input<string>('Label');
  internalValue: number = 0;
  valueChangedEvent = output<number>();

  parameterSet() {
    this.valueChangedEvent.emit(+this.internalValue);
  }
}
