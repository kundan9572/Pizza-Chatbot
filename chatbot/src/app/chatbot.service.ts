import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private baseUrl = 'event';
  private baseUrl1 = 'vegpizza';
  private baseUrl2 = 'nonvegpizza';
  private baseUrl3 = 'details';
  private baseUrl4 = 'order';
  private baseUrl5 = 'cancel';


  constructor(private http: HttpClient) { }

  getMassage(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getVegPizza(): Observable<any> {
    return this.http.get(`${this.baseUrl1}`);
  }

  getNonVegPizza(): Observable<any> {
    return this.http.get(`${this.baseUrl2}`);
  }

  putdetail(oid1:number,name1 :string,address1:string,method1:string,date1:string,uid1:number,total1:number,status1:string) {
   // console.log("data",name1,address)
    const obj = {oid:oid1,name: name1, address: address1,method:method1,date:date1,uid:uid1,total:total1,status:status1};
    return this.http.post(`${this.baseUrl3}`,obj);
  }

    getOrderStatus(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl4}/${id}`);
  }

  cancelOrder(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl5}/${id}`);
  }

}
