/**
 * Interface for incoming JSON data.
 */
export interface Alert {
   AlertId: number;
   AlertTime: string;
   Severity: string;
   ClientIP: string;
   ServerIP: string;
   Protocol: string;
   ClientCountry: string;
}
