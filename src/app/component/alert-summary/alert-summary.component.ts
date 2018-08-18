import { Alert } from '../../model/alert';
import { Filter } from '../../model/filter';
import { AlertService } from '../../service/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-summary',
  templateUrl: './alert-summary.component.html',
  styleUrls: ['./alert-summary.component.css']
})
export class AlertSummaryComponent implements OnInit {

  alerts: Alert[];
  filteredAlerts: Alert[];
  filters: Filter<Alert>[];
  nonEmptyFilters: Filter<Alert>[];

  constructor(private alertService: AlertService) {
    this.alerts = this.filteredAlerts = [];
    this.filters = [];
  }

  ngOnInit() {
     this.alertService.getAlerts().subscribe(alerts => this.filteredAlerts = this.alerts = alerts );
     this.alertService.getCategories().subscribe(labels => this.createFilters(labels));
  }

  private createFilters(labels: String[]) {
    const filters = this.filters;

    for (const label of labels) {
      filters.push(new Filter(label.replace(/\s/g, ''), label, [], null));
    }
  }

  addFilter(request: Filter<Alert>) {
    const filters  = this.filters;
    const filter = filters.find(group => group.key === request.key);
    if (filter) {
      request.values.filter(val => !filter.values.some(existing => existing === val)).forEach(val => filter.values.push(val));
      this.filter();
    }

  }

  filter() {
    this.nonEmptyFilters = this.filters.filter(filter => filter.values.length > 0);

    this.filteredAlerts = this.alerts.filter(element => {
      for (const filter of this.filters) {
        if (filter.condition(element) === false) {
          return false;
        }
      }

      return true;
    });
  }

  clearFilter(key: string) {
    const filter = this.filters.find(e => e.key === key);
    if (filter) {
      filter.values = [];
      this.filter();
    }
  }

  clearAll() {
    this.filters.forEach(filter => filter.values = []);
    this.filter();
  }

}
