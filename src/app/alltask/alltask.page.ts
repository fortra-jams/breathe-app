import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alltask',
  templateUrl: './alltask.page.html',
  styleUrls: ['./alltask.page.scss'],
})
export class AlltaskPage implements OnInit {

  items: Array<any>;

  constructor(public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
    
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
