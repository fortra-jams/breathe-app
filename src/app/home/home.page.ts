import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userEmail: string;

  constructor(private menu: MenuController,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(){
    if(this.authService.userDetails){
      this.userEmail = this.authService.userDetails().email;
      console.log(this.userEmail);
    }
  }

  openEnd() {
    this.menu.enable(true, 'end');
    this.menu.open('end');
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
  }
// Doughnut
public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
public doughnutChartData:number[] = [350, 450, 100];
public doughnutChartType:string = 'doughnut';

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}
}
