import { Component, input, output } from '@angular/core';

@Component({
  selector: 'parameter',
  imports: [],
  template: `
    <div class="">
      <p>{{label()}}</p>
      <input #inputField class="manual-input" type="number" placeholder="Enter {{ label().toLowerCase() }}" (input)="parameterSet(inputField.valueAsNumber)" />
    </div>
  `,
})
export class Parameter {
  label = input<string>('Label');
  valueChangedEvent = output<number>();

  parameterSet(value: number) {
    this.valueChangedEvent.emit(value);
  }
}
