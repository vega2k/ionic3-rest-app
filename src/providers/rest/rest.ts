import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {Product} from "../../models/product";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  baseUrl:string = "http://localhost:3000";

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  //상품 목록 조회
  public getProducts():Observable<Product[]> {
    return this.http.get(this.baseUrl+"/products")
      .map((products:Product[]) => {
        return products.map(product => {
          return new Product(product)
        })
      }).catch(err => Observable.empty<Product[]>());
  }

  //상품 등록
  public createProduct(product:Product):Observable<Product> {
    return this.http.post(this.baseUrl+"/products",product)
      .map(res => new Product(res))
      .catch(err => {
        console.log("createProduct error " + err);
        return Observable.empty<Product>();
      });
  }

  //상품 수정
  public updateProduct(product:Product):Observable<Product> {
    return this.http.put(this.baseUrl+"/products/"+product.id,product)
      .map(res => new Product(res))
      .catch(err => {
        console.log("updateProduct error " + err);
        return Observable.empty<Product>();
      });
  }
  //상품 삭제
  public deleteProductById(productId:number):Observable<Product> {
    return this.http.delete(this.baseUrl+"/products/"+productId)
      .map(res => new Product(res))
      .catch(err => {
        console.log("deleteProduct error : " + err);
        return Observable.empty<Product>();
      })
  }

}
