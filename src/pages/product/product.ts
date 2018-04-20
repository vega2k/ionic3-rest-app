import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import {Product} from "../../models/product";
import {RestProvider} from "../../providers/rest/rest";
import {HomePage} from "../home/home";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  myProduct:Product;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public rest:RestProvider,
              public toastCtrl:ToastController) {
    this.myProduct = new Product(navParams.get("product"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  saveProduct(product:Product) {
    //수정
    if(product.id) {
      this.rest.updateProduct(product).subscribe(res => {
        this.myProduct = res;
        this.showSuccessMessage("Product " + product.id + " : " +
          product.name + " 수정됨!");
        this.navCtrl.setRoot(HomePage);
      });
    }else {
    //등록
      this.rest.createProduct(product)
        .subscribe(product => {
          this.myProduct = product;
          this.showSuccessMessage("Product " + product.id + " : " +
            product.name + " 등록됨!");
          this.navCtrl.setRoot(HomePage);
        });
    }
  }

  deleteProduct(productId:number) {
    this.rest.deleteProductById(productId)
      .subscribe(res => {
        console.log(res);
        this.showSuccessMessage("Product " + productId+ " 삭제됨!");
        this.navCtrl.setRoot(HomePage);

      })
  }

  showSuccessMessage(msg:string) {
    this.toastCtrl.create({
      message:msg,
      showCloseButton:true,
      duration:3000,
      position:'middle'
    }).present();
  }

}
