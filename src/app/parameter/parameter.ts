import { Component, input, output } from '@angular/core';

@Component({
  selector: 'parameter',
  imports: [],
  template: `
    <div class="">
      <p>{{label()}}</p>
      <input #inputField class="parameter-field" type="number" placeholder="Enter value" (input)="parameterSet(inputField.valueAsNumber)" />
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
