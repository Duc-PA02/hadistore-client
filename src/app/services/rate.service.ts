import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RateRequest } from '../common/dto/RateRequest';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  url = "http://localhost:8080/api/v1/rates";

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.url);
  }

  getByProduct(id:number) {
    return this.httpClient.get(this.url+'/product/'+id);
  }

  getByOrderDetail(id: number) {
    return this.httpClient.get(this.url+"/order-detail/"+id);
  }

  post(rate: RateRequest) {
    return this.httpClient.post(this.url, rate);
  }

  put(rate: RateRequest) {
    return this.httpClient.post(this.url, rate);
  }
}
