import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { ChartData, ChartType } from 'chart.js';

import { Sales } from '@models/sales.model';

import { Subscription } from 'rxjs';
import { AppStateWithSales } from '../sales.reducer';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styles: [],
})
export class ChartsComponent implements OnInit, OnDestroy {
  incomesItems: number;
  expensesItems: number;
  totalIncomes: number;
  totalExpenses: number;

  public doughnutChartLabels: string[] = ['Income', 'Expenses'];

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [],
  };

  private _subscription: Subscription;

  constructor(private _store: Store<AppStateWithSales>) {
    this.incomesItems = 0;
    this.expensesItems = 0;
    this.totalExpenses = 0;
    this.totalIncomes = 0;

    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    this._subscription = this._store.select('sales').subscribe(({ items }) => this._generateChart(items));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _generateChart(sales: Sales[]) {
    const { expenses, incomes } = sales.reduce(
      (previous, current) => {
        if (current.type === 'input') {
          const incomes = { ...previous.incomes };
          previous = {
            ...previous,
            incomes: {
              total: incomes.total + current.amount,
              count: (incomes.count += 1),
            },
          };
        } else {
          const expenses = { ...previous.expenses };
          previous = {
            ...previous,
            expenses: {
              total: expenses.total + current.amount,
              count: (expenses.count += 1),
            },
          };
        }

        return previous;
      },
      {
        incomes: {
          total: 0,
          count: 0,
        },
        expenses: {
          total: 0,
          count: 0,
        },
      }
    );

    this.incomesItems = incomes.count;
    this.totalIncomes = incomes.total;
    this.expensesItems = expenses.count;
    this.totalExpenses = expenses.total;

    this.doughnutChartData = {
      ...this.doughnutChartData,
      datasets: [{ data: [this.totalIncomes, this.totalExpenses] }],
    };
  }
}
