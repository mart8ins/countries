import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-currency-rates',
  templateUrl: './currency-rates.component.html',
  styleUrls: ['./currency-rates.component.css']
})
export class CurrencyRatesComponent implements OnInit {

  // input for chosen countrys currency code to use in new api call for different service
  @Input('currencie') currCode: string;

  constructor(private dataService: DataService) { }

  // apiKey code for using services https://api.currencyfreaks.com
  apiKey = '9f9c11f1e73342eeb2961bc7fa0d25b9';
  baseCountry: string; // base is USD
  actualCountry: string; // chosen countrys
  currencieRatesDate: string;
  rate: string | number;


  ngOnInit(): void {
    setTimeout(() => {
      this.getCurrencieRates();
    }, 500);

  }


  getCurrencieRates() {
    let urlAll = `https://api.currencyfreaks.com/latest?apikey=${this.apiKey}&symbols=${this.currCode}`;
    if (this.currCode) {
      this.dataService.getData(urlAll)
        .subscribe((resp) => {
          this.currencieRatesDate = resp['date'];
          this.baseCountry = resp['base'];
          this.actualCountry = this.currCode;
          this.rate = resp['rates'][this.currCode];
        })
    }
  }
}
