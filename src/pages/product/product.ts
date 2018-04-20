import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Product} from "../../models/product";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myProduct = new Product(navParams.get("product"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

}
