import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { SalesPipe } from '../pipes/sales.pipe';
import { SalesComponent } from './sales.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { DetailsComponent } from './details/details.component';

import { SharedModuleModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardComponent, SalesComponent, ChartsComponent, DetailsComponent, SalesPipe],
  imports: [CommonModule, ReactiveFormsModule, NgChartsModule, SharedModuleModule, RouterModule],
  exports: [],
  providers: [],
})
export class SalesModule {}
