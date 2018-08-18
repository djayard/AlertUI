import { Alert } from '../../model/alert';
import { Filter } from '../../model/filter';
import { Group } from '../../model/group';
import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alert-category',
  templateUrl: './alert-category.component.html',
  styleUrls: ['./alert-category.component.css']
})
export class AlertCategoryComponent implements OnInit, OnChanges {
  @Input() key: string;
  @Input() label: string;
  @Input() alerts: Alert[];
  @Output() filterRequest = new EventEmitter<Filter<String>>();
  groups: Group<Alert>[] = [];

  ngOnInit() {
    this.groupAlerts();
  }

  ngOnChanges() {
    this.groupAlerts();
  }

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
