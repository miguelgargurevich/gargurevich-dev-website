import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Cargar el prompt inicial como contexto del asistente


const LOCAL_API_URL = '/api/ai-chat';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

@Injectable({ providedIn: 'root' })
export class AiChatService {
  private systemPrompt: string | null = null;
  private promptLoaded = false;

  /**
   * Carga el prompt inicial desde assets/prompts/PROMPT-INICIAL.md
   * Solo se carga una vez por sesión.
   */
  loadPrompt(): Observable<string> {
    if (this.promptLoaded && this.systemPrompt) {
      return new Observable(observer => {
        observer.next(this.systemPrompt!);
        observer.complete();
      });
    }
    return this.http.get('/assets/prompts/PROMPT-INICIAL.md', { responseType: 'text' }).pipe(
      map(prompt => {
        this.systemPrompt = `Eres el asistente virtual de Gargurevich.Dev. Responde de forma profesional, empática y clara, usando solo la información de contexto proporcionada. Si no sabes la respuesta, invita a contactar a un humano.\n\nContexto:\n${prompt}`;
        this.promptLoaded = true;
        return this.systemPrompt;
      })
    );
  }

  constructor(private http: HttpClient) {}

  /**
   * Envía un mensaje al backend de Gemini, asegurando que el prompt esté cargado.
   */
  sendMessage(history: ChatMessage[], userMessage: string): Observable<string> {
    return new Observable<string>(observer => {
      this.loadPrompt().subscribe({
        next: (prompt) => {
          const messages = [
            { role: 'system', content: prompt },
            ...history.filter(m => m.role !== 'system'),
            { role: 'user', content: userMessage }
          ];
          const body = {
            contents: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
          };
          const url = LOCAL_API_URL;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          this.http.post<any>(url, body, { headers }).pipe(
            map(res => {
              if (res && res.candidates && res.candidates[0]?.content?.parts[0]?.text) {
                return res.candidates[0].content.parts[0].text.trim();
              }
              return 'Lo siento, no pude generar una respuesta en este momento.';
            }),
            catchError(err => {
              if (err.status === 429 || (err.error && (err.error.error?.message?.includes('quota') || err.error.error?.code === 429))) {
                return throwError(() => 'La cuota gratuita de la IA ha sido superada. Por favor, intenta más tarde o contáctanos directamente.');
              }
              return throwError(() => 'Ocurrió un error al conectar con el asistente. Intenta nuevamente más tarde.');
            })
          ).subscribe({
            next: (response) => {
              observer.next(response);
              observer.complete();
            },
            error: (err) => {
              observer.error(err);
            }
          });
        },
        error: (err) => {
          observer.error('No se pudo cargar el contexto del asistente. Intenta nuevamente más tarde.');
        }
      });
    });
  }
}
