import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Parameter } from './parameter/parameter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Parameter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Economia');
}
