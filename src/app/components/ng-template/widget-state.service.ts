import { Injectable } from '@angular/core';
import { WeatherData } from './weather-data';

@Injectable()

export class WidgetState {
    
  data: WeatherData = {
    temperature: 72,    
    windspeed: 10,
    skyCondition: 'sunny'
  }

  lastUpdated: Date = new Date();
}