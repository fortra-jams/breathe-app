import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { MenuController,LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  
  items= [];
  

  userEmail: string;
  public totalTask: Observable<any>;
  ttlTask: number;

  constructor(private menu: MenuController,
    public loadingCtrl: LoadingController,
    private firebaseService: FirebaseService,
    private afs : AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(){
    this.getData();
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
    
    for (let item of this.items){
        console.log(item);
    }
    console.log(this.items);
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      })
    })
  }
  async presentLoading(loading) {
    return await loading.present();
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
  
