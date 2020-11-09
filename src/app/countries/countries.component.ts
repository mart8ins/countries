import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  countryData;
  countryBorderCountries: any[] = [];
  countryName: string;
  url: string;
  showBrorders = false;
  currencieCode: string;



  ngOnInit(): void {
    this.countryName = this.activatedRoute.params["value"].country;
    this.url = `https://restcountries.eu/rest/v2/name/${this.countryName}?fullText=true`;

    this.dataService.getData(this.url)
      .subscribe((resp) => {
        this.countryData = resp;
      })

    setTimeout(() => {
      this.getBorderCountries();
      this.currencieCode = this.getCurrencieCode();
    }, 500);
  }


  // get country border countries name codes
  getBorderCountries() {
    let borderCountries: [];
    if (this.countryData.length > 0) {
      borderCountries = this.countryData.map((data) => {
        return data.borders;
      })
    }
    borderCountries.forEach((item) => {
      this.countryBorderCountries.push(item);
    })
  }

  // getting chosen country currency code which will be used in currency-rates component to get exchange rates for this currency code
  getCurrencieCode() {
    let currencyCode: string;
    this.countryData.forEach((item) => {
      item.currencies.forEach((curr) => {
        currencyCode = curr.code;
      })
    })
    return currencyCode;
  }


  /* button to change status for to show or not, border countries */
  showBorderCountries() {
    !this.showBrorders ? this.showBrorders = true : this.showBrorders = false;
  }




  // getCurrencieRates() {
  //   let apikey = '9f9c11f1e73342eeb2961bc7fa0d25b9';
  //   if (this.currencieCode) {
  //     let urlAll = `https://api.currencyfreaks.com/latest?apikey=${apikey}&symbols=${this.currencieCode}`;
  //     this.dataService.getData(urlAll)
  //       .subscribe((resp) => {
  //         this.currencieRatesDate = resp['date'];
  //         console.log(this.currencieRatesDate)
  //         this.baseCountry = resp['base'];
  //         this.actualCountry = this.currencieCode;
  //         console.log(this.actualCountry)
  //         this.rate = resp['rates'][this.currencieCode];
  //         console.log(this.rate)
  //       })
  //   }
  // }


}
