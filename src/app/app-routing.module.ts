import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionDataComponent } from './regions/region-data/region-data.component';
import { RegionsComponent } from './regions/regions.component';

const routes: Routes = [
  { path: 'region-data/:region/:country', component: RegionDataComponent },
  { path: 'region-data/:region', component: RegionDataComponent },
  { path: '**', component: RegionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
