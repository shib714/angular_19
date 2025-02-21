import { Component } from '@angular/core';

@Component({
  selector: 'app-observables',
  imports: [],
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.scss'
})
export class ObservablesComponent {

  data: number[] = [];
  count = 0;

  ngOnInit() {

    setInterval(() => {
      this.count++;
      this.data.push(this.count);
    }, 1000);
    
  }

  getData() {
    console.log("Get data :" + this.data);
  }


}
