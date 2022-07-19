import { Pipe, PipeTransform } from '@angular/core';

import { Sales } from '@models/sales.model';

@Pipe({ name: 'sales' })
export class SalesPipe implements PipeTransform {
  transform(items: Sales[] | null): Sales[] {
    if (!items) return [];
    return [...items].sort((a, b) => (a.type === 'input' ? -1 : 1));
  }
}
