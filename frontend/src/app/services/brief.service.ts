import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BriefService {
  constructor(private http: HttpClient) {}

  sendBrief(data: any): Observable<any> {
    // Envía el payload tal cual, sin forzar tipo ni sobrescribir campos
    return this.http.post('/api/send-mail', { ...data });
  }
}
