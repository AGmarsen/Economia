import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NumberPicker } from "./number-picker/number-picker";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NumberPicker],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Economia');
}
