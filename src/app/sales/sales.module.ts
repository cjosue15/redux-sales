import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { NgChartsModule } from 'ng2-charts';

import { SalesPipe } from '../pipes/sales.pipe';
import { SalesComponent } from './sales.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { DetailsComponent } from './details/details.component';

import { SharedModuleModule } from '../shared/shared.module';

import { DashboardRoutingModule } from '../dashboard/dashboar-routing.module';
import { salesReducer } from './sales.reducer';

@NgModule({
  declarations: [DashboardComponent, SalesComponent, ChartsComponent, DetailsComponent, SalesPipe],
  imports: [
    CommonModule,
    StoreModule.forFeature('sales', salesReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModuleModule,
    RouterModule,
    DashboardRoutingModule,
  ],
  exports: [],
  providers: [],
})
export class SalesModule {}
