import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  countryData: any[] = [];
  countryName: string;
  url: string;
  showBrorders = false;
  currencieCode: string;

  countryBorderCountries: [] = [];
  countryCodeWithFlag: any[] = [];



  ngOnInit(): void {
    this.countryName = this.activatedRoute.params["value"].country;
    this.url = `https://restcountries.eu/rest/v2/name/${this.countryName}?fullText=true`;

    this.dataService.getData(this.url)
      .subscribe((resp) => {
        this.countryData.push(resp[0]);
        console.log(this.countryData)
      })

    setTimeout(() => {
      this.getBorderCountries();
      this.currencieCode = this.getCurrencieCode();
    }, 500);
  }


  // get country border countries name codes
  getBorderCountries() {
    let borderCountries;

    // getting countrys border countrys array
    if (this.countryData && this.countryData.length > 0) {
      this.countryData.forEach((data) => {
        borderCountries = data.borders;
      })
    }
    this.countryBorderCountries = borderCountries;

    // to get border countries flag
    this.getBorderCountriesFlags(this.countryBorderCountries);
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


  getBorderCountriesFlags(countries): void {
    // getting all countries
    let currentCodes = countries;

    // api where gets all countries
    let urlAll = 'https://restcountries.eu/rest/v2/all';

    let countryCodeFlag: {
      code: string
      flag: string
    }

    this.dataService.getData(urlAll)
      .subscribe(resp => {
        let allCountries = resp;
        for (let i = 0; i < currentCodes.length; i++) {
          for (let j in allCountries) {
            // console.log(allCountries[j].alpha3Code, 'not')
            if (countries[i] == allCountries[j].alpha3Code) {
              countryCodeFlag = { code: countries[i], flag: allCountries[j].flag };
              this.countryCodeWithFlag.push(countryCodeFlag)
            }
          }
        }
      })
  }
}
