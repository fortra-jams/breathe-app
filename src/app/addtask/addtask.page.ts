import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.page.html',
  styleUrls: ['./addtask.page.scss'],
})
export class AddtaskPage implements OnInit {
  validations_form: FormGroup;
  image: any;


  constructor(  private imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private webview: WebView
   
  ) { }

  ngOnInit() {
    this.resetFields();
  }
  
  resetFields(){
    this.image = "../../assets/default_image.png";
    this.validations_form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      taskType: new FormControl('', Validators.required),
      taskDifficulty: new FormControl('', Validators.required)
    });
  }


  onSubmit(value){
    let date = new Date()
    console.log("Current Date ",date) 
    let data = {
      title: value.title,
      taskType: value.taskType,
      description: value.description,
      taskStatus: "notDone",
      taskDifficulty : value.taskDifficulty,
      date: date
    }

    this.firebaseService.addTask(data)
    .then(
      res => {
        this.router.navigate(["/alltask"]);
      }
    )
  }

  openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }


  async uploadImageToFirebase(image){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image_src, randomId)
    .then(photoURL => {
      this.image = photoURL;
      loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

}
