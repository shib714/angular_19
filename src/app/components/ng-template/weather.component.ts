import { Component } from '@angular/core';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';

@Component({
  selector: 'app-weather',
  imports: [WeatherWidgetComponent],
  template: `
    <app-weather-widget></app-weather-widget>
  `,
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {

}
