import { Alert } from '../../model/alert';
import { Filter } from '../../model/filter';
import { Group } from '../../model/group';
import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

/**
 * Component representing alerts that have been grouped by a specific property.
 */
@Component({
  selector: 'app-alert-category',
  templateUrl: './alert-category.component.html',
  styleUrls: ['./alert-category.component.css']
})
export class AlertCategoryComponent implements OnInit, OnChanges {

  /**
   * THe property this component will group by.
   */
  @Input() key: string;

  /**
   * The title of this component.
   */
  @Input() label: string;

  /**
   * The alerts this component will group.
   */
  @Input() alerts: Alert[];

  /**
   * Event broadcast when a user indicates that they want to filter on the property
   * indicated by this component's key.
   */
  @Output() filterRequest = new EventEmitter<Filter<String>>();

  groups: Group<Alert>[] = [];

  ngOnInit() {
    this.groupAlerts();
  }

  ngOnChanges() {
    this.groupAlerts();
  }

  /**
   * Broadcasts to parent component that the user would like a filter to be updated.
   * @param value The value that should be added to the filter corresponding to this component's key.
   */
  addFilter(value: string) {
    this.filterRequest.emit(new Filter(this.key, this.label, [value], null));
  }

  private groupAlerts() {
    const groups = this.groups;
    groups.splice(0);

    const discoveredGroups: {[key: string]: Group<Alert>} = {};

    for (const alert of this.alerts) {
      const groupName = alert[this.key];
      let group = discoveredGroups[groupName];
      if (!group) {
        discoveredGroups[groupName] = group = new Group(groupName || '<Unknown>', []);
        groups.push(group);
      }
      group.members.push(alert);
    }

  }

}
