import { Alert } from '../model/alert';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Class that handles fetching Alert data.
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private static readonly FILTER_CATEGORIES: String[] = ['Severity', 'Client IP', 'Protocol', 'Client Country'];

  constructor(private client: HttpClient) {}

  getAlerts(): Observable<Alert[]> {
    return this.client.get<Alert[]>('assets/alerts.json');
  }

  getCategories(): Observable<String[]> {
    return of(AlertService.FILTER_CATEGORIES);
  }
}
