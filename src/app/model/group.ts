/**
 * Simple model for a data grouping.
 */
export class Group<T> {

  constructor(public name: string, public members: T[]) {}

}
