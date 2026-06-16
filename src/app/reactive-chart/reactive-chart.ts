import { Component, input, effect, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'reactive-chart',
  imports: [],
  template: '<canvas #chartCanvas></canvas>',
})
export class ReactiveChart implements AfterViewInit, OnDestroy {

  chart?: Chart;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chartData = input.required<ChartConfiguration['data']>();
  type = input.required<ChartConfiguration['type']>();

  constructor() {
    effect(() => {
      const chartData = this.chartData();
      if (this.chart) {
        this.chart.data = chartData;
        this.chart.update();
      }
    });
  }


  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: this.type(),
      data: this.chartData(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
