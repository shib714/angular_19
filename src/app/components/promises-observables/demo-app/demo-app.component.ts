import { Component } from '@angular/core';
import { PromisesComponent } from '../promises/promises.component';
import { MatCardModule } from '@angular/material/card';
import { ObservablesComponent } from '../observables/observables.component';

@Component({
  selector: 'app-demo-app',
  imports: [PromisesComponent, MatCardModule, ObservablesComponent],
  templateUrl: './demo-app.component.html',
  styleUrl: './demo-app.component.scss'
})
export class DemoAppComponent {

}
