import { Predicate } from '@angular/core';

/**
 * Class representing a filter instruction.
 */
export class Filter<T> {
  /**
   * Property that this filter tests.
   */
  key: string;

  /**
   * The display name for this filter.
   */
  label: string;

  /**
   * Values to match on.
   */
  values: any[];

  /**
   * Boolean test to execute on your data. If this property is omitted when calling the constructor,
   * then it defaults to a function that accepts an argument `arg` and returns true if and only if
   * values is empty or arg[key] has a match in values.
   */
  condition: Predicate<T>;

  constructor(key, label, values, condition) {
    this.key = key;
    this.label = label;
    this.values = values || [];
    this.condition = condition || ( arg => this.values.length === 0 || this.values.some(value => value === arg[key] ) );
  }
}
