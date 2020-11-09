import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegionsComponent } from './regions/regions.component';
import { RegionDataComponent } from './regions/region-data/region-data.component';
import { CountriesComponent } from './countries/countries.component';
import { CurrencyRatesComponent } from './countries/currency-rates/currency-rates.component';

@NgModule({
  declarations: [
    AppComponent,
    RegionsComponent,
    RegionDataComponent,
    CountriesComponent,
    CurrencyRatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
