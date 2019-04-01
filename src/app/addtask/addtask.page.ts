import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.page.html',
  styleUrls: ['./addtask.page.scss'],
})
export class AddtaskPage implements OnInit {
  validations_form: FormGroup;
  image: any;


  constructor(  //private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
   
  ) { }

  ngOnInit() {
    this.resetFields();
  }
  resetFields(): any {
    throw new Error("Method not implemented.");
  }

}
