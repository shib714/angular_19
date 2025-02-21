import { Component } from '@angular/core';

@Component({
  selector: 'app-promises',
  imports: [],
  templateUrl: './promises.component.html',
  styleUrl: './promises.component.scss'
})
export class PromisesComponent {

  isOnLine: boolean = false;
  status: string = "offline";
  myPromise: Promise<any> | undefined;

  ngOnInit() {
    this.getStatus();
    this.myPromise?.then((value: any) => {
      console.log("Promise resolved with value: " + value)
      this.checkLogic();
    },
      (error: any) => {
        console.log("Promise rejected with value: " + error);
      });
  }

  getStatus() {
    console.log("Get status called");
    this.myPromise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        console.log("Received status value");
        this.isOnLine = true;
        //resolve(this.isOnLine);
        reject('DB connection failed');
      }, 5000);
  
    });
  }
  checkLogic() {
    console.log("Get logic called");
    if (this.isOnLine) {
      this.status = "online";
    } else {
      this.status = "offline";
    }
  }

}
