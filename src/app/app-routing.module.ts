import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { RegionDataComponent } from './regions/region-data/region-data.component';
import { RegionsComponent } from './regions/regions.component';

const routes: Routes = [
  { path: 'region-data/:region', component: RegionDataComponent },
  { path: 'country-data/:country', component: CountriesComponent },
  { path: '**', component: RegionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
