import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BriefService {
  constructor(private http: HttpClient) {}

  sendBrief(data: any): Observable<any> {
    // Ahora usa el nuevo endpoint y tipo para cotizaciones
    return this.http.post('/api/send-mail', { ...data, tipo: 'cotizacion' });
  }
}
