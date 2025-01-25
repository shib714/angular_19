import { Component, inject } from '@angular/core';
import { CurrencyService } from '../../../services/currency.service';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { LicensePlateComponent } from '../license-plate.component';
import { PlateService } from '../../../services/plate.service';
import { JumbotronComponent } from '../../jumbotron/jumbotron.component';



@Component({
  selector: 'app-store-view',
  imports: [MatGridListModule, LicensePlateComponent,JumbotronComponent, AsyncPipe],
  templateUrl: './store-view.component.html',
  styleUrl: './store-view.component.scss'
})
export class StoreViewComponent {

  plateService: PlateService = inject(PlateService);

  plates$ = this.plateService.fetchPlates();

  currencyInfo = inject(CurrencyService).getCurrencyInfo();  

}
