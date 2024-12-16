import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private websocket: WebSocket;

  constructor() {
    this.websocket = new WebSocket('ws://localhost:8080/logs');
    this.websocket.onmessage = (event) => {
      console.log('Log recebido:', event.data);
    };
    this.websocket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };
  }

  onMessage(callback: (message: string) => void) {
    this.websocket.onmessage = (event) => {
      callback(event.data);
    };
  }

  close() {
    this.websocket.close();
  }
}
