import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-region-data',
  templateUrl: './region-data.component.html',
  styleUrls: ['./region-data.component.css']
})
export class RegionDataComponent implements OnInit {

  constructor(private dataService: DataService, private activeRoute: ActivatedRoute) { }

  countryName: any[] = [];

  ngOnInit(): void {
    // activated routes endpoint as a param / country name - options europe, asia, americas, oceania, africa
    let region = this.activeRoute.params["value"].region;
    // url dependig which countrie endpoint there  is
    let url = `https://restcountries.eu/rest/v2/region/${region}`;

    // using dataServices method "GET" API data for needed region
    this.dataService.getData(url)
      .subscribe((response) => {
        console.log(response[0].flag)
        // looping through response data and storing objects in new array - pushing {countries name, countries flag}
        for (let i in response) {
          this.countryName.push({ name: response[i].name, flag: response[i].flag })
        }
      })
  }
}
