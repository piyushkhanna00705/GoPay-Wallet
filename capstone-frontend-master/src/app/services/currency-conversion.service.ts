
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConversionService {

  constructor(private httpClient:HttpClient) { }

  private baseUrl:string = "http://data.fixer.io/api/latest";

  getRates(from:string, to:string):any{
    let parameter = {access_key:"8bd88c0daa5403a6229da7b29e7be5db", symbols:`${from},${to}`};
    return this.httpClient.get(this.baseUrl,{params:parameter});
  }
  convert(from:string, to:string, amount:number){
    var subject = new Subject<number>();
    
    this.getRates(from, to).subscribe((data: any) => {
      let rates = data.rates;
      let fromRate = rates[`${from}`];
      let toRate = rates[`${to}`];
      let convertedAmt:number=  parseFloat((amount * toRate / fromRate).toFixed(2));
      // console.log(convertedAmt);
      subject.next(convertedAmt);
    });
    return subject.asObservable();
  }
}
