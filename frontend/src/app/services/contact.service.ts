import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  sendContact(data: any): Observable<any> {
    // Usa el nuevo endpoint y tipo para contacto
    return this.http.post('/api/send-mail', { ...data, tipo: 'contacto' });
  }
}
