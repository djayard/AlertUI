import { Predicate } from '@angular/core';

export class Filter<T> {
  key: string;
  label: string;
  values: any[];
  condition: Predicate<T>;

  constructor(key, label, values, condition) {
    this.key = key;
    this.label = label;
    this.values = values || [];
    this.condition = condition || ( arg => this.values.length === 0 || this.values.some(value => value === arg[key] ) );
  }
}
