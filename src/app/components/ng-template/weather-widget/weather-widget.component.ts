import { Component, inject, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { WidgetActions } from '../widget-actions.service';
import { WidgetState } from '../widget-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-widget',
  imports: [CommonModule],
  template: `
    <div class="widget-header">
         <!-- <ng-container #container></ng-container>  -->
         <ng-container [ngTemplateOutlet]="defaultWidgetHeader"></ng-container> 
        <ng-template #defaultWidgetHeader>
          <div class="widget-title">Weather Forecast</div>
          <div class="widget-sub-title">Current weather in your location</div>
          <div class="widget-sub-title">Last updated at: {{state.lastUpdated | date: 'yyyy-mm-dd HHH-mm-ssSSS'}}</div>
        </ng-template>

    </div>    
    <div class="widget-content">
      <div class="weather-icon">
        <img src="assets/weather-sunny.png" width="100" height="100" alt="Weather Icon">
      </div>
      <div class="weather-data">
        <div class="temperature"></div>
        <div class="sky-condition">{{state.data.skyCondition}}</div>
        <div class="temperature">{{state.data.temperature}}°F</div>
        <div class="windspeed">{{state.data.windspeed}} mph</div>
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

  //declerative way to create a template
  // @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;
  // @ViewChild('defaultWidgetHeader') headerTemplate!: TemplateRef<any>;

  // ngAfterViewInit() {
  //   this.container.createEmbeddedView(this.headerTemplate);
  // }

  //we can also use NGTemplateOutlet directive (from CommonModule) to render the template alternatively
  //we will commented out the above code and use the below code to the template to render
  // <ng-container [ngTemplateOutlet]="defaultWidgetHeader"></ng-container> and it will work the same way
  // resulting to write less code

  //s



}
