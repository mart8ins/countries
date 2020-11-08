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


  ngOnInit(): void {
    this.countryName = this.activatedRoute.params["value"].country;
    // this.url = `https://restcountries.eu/rest/v2/name/${this.countryName}`;
    this.url = `https://restcountries.eu/rest/v2/name/${this.countryName}?fullText=true`;

    this.dataService.getData(this.url)
      .subscribe((resp) => {
        this.countryData = resp;
        console.log(resp)
      })
    console.log(this.countryData)
    setTimeout(() => {
      this.getBorderCountries();
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
    console.log(this.countryBorderCountries, "???")
  }


  /* button to change status for to show or not, border countries */
  showBorderCountries() {
    !this.showBrorders ? this.showBrorders = true : this.showBrorders = false;
  }

}
