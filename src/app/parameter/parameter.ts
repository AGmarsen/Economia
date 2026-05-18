import { Component, input, output } from '@angular/core';

@Component({
  selector: 'parameter',
  imports: [],
  template: `
    <div class="">
      <p>{{label()}}</p>
      <input #inputField class="parameter-field" type="number" [value]="value()" placeholder="Enter value" (input)="parameterSet(inputField.valueAsNumber)" />
    </div>
  `,
})
export class Parameter {
  value = input<number>(0);
  label = input<string>('Label');
  valueChangedEvent = output<number>();

  parameterSet(value: number) {
    this.valueChangedEvent.emit(value);
  }

}
