import { Component, inject } from '@angular/core';
import { WidgetActions } from '../widget-actions.service';
import { WidgetState } from '../widget-state.service';

@Component({
  selector: 'app-weather-widget',
  imports: [],
  template: `
    <div class="widget-header">
      <div class="widget-title">Weather Forecast</div>
      <div class="widget-sub-title">Current weather in your location</div>
    </div>    
    <div class="widget-content">
      <div class="weather-icon">
        <img src="assets/weather-sunny.png" width="100" height="100" alt="Weather Icon">
      </div>
      <div class="weather-data">
        <div class="temperature"></div>
        <div class="sky-condition">Sunny</div>
        <div class="temperature">72°F</div>
        <div class="windspeed">10 mph</div>
      </div>
    </div>
    <div class="widget-actions">
      <button (click)="actions.reload()">Reload</button>
      <button (click)="actions.copyData()">Copy info</button>
    </div>
 
  `,
  styleUrl: './weather-widget.component.scss',
  providers: [WidgetActions, WidgetState]
})
export class WeatherWidgetComponent {

  state = inject(WidgetState, { self: true });
  actions = inject(WidgetActions, { self: true });



}
