import { Routes } from '@angular/router';

import { ChartsComponent } from '../sales/charts/charts.component';
import { SalesComponent } from '../sales/sales.component';
import { DetailsComponent } from '../sales/details/details.component';

export const dashboardRoutes: Routes = [
  { path: '', component: ChartsComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'detail', component: DetailsComponent },
];
