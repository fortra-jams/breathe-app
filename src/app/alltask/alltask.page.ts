import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
//import { reorderArray } from 'ionic-angular';


@Component({
  selector: 'app-alltask',
  templateUrl: './alltask.page.html',
  styleUrls: ['./alltask.page.scss'],
})
export class AlltaskPage implements OnInit {

  items = [];

  constructor(public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService) {
        for(let x = 0; x<5; x++){
          this.items.push(x);
        }

     }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
    
  }

 /* reorderItems(ev){
    const itemMove = this.items.splice(ev.detail.from, 1)[0];
    this.items.splice(ev.detail.to, 0, itemMove);
    ev.detail.complete();
    }*/

  notDone(taskKey,status){
    this.firebaseService.updateTaskStatus(taskKey,'notDone');
  }

  done(taskKey,status){
    this.firebaseService.updateTaskStatus(taskKey,'Done');

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

}
