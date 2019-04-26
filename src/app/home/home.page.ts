import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userEmail: string;
  public totalTask: Observable<any>;
  ttlTask: number;

  constructor(private menu: MenuController,
    private authService: AuthService,
    private router: Router,
    private firebaseService: FirebaseService) { }

  ngOnInit(){
    if(this.authService.userDetails){
      this.userEmail = this.authService.userDetails().email;
      console.log(this.userEmail);
    }
    this.totalTask = this.firebaseService.getTaskTotal().valueChanges();
    this.totalTask.subscribe(val =>{
      this.ttlTask = val['totalTask'];
      console.log(val['totalTask']);
      console.log(this.ttlTask);
      console.log(JSON.stringify(val));
    });
    console.log(this.totalTask);
  }

  openEnd() {
    this.menu.enable(true, 'end');
    this.menu.open('end');
  }

  logout(){
    this.menu.close('end');
    this.authService.doLogout()
    .then(res => {
      this.firebaseService.unsubscribeOnLogOut();
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
  }
// Doughnut
public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Total task'];
public doughnutChartData:number[] = [5, 10, 6 ];
public doughnutChartType:string = 'doughnut';

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}
}
