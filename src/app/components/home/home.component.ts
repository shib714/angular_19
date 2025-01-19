import { Component } from '@angular/core';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';

@Component({
  selector: 'app-home',
  imports: [JumbotronComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
