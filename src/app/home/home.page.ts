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
public doughnutChartLabels:string[] = ['Exercise', 'Task', 'Stuff'];
public doughnutChartData:number[] = [350, 450, 100];
public doughnutChartType:string = 'doughnut';

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  
  
}
  
