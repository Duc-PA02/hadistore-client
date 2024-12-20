import { Injectable } from '@angular/core';
import { ChatMessage } from '../common/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocket!: WebSocket;
  chatMessages: ChatMessage[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor() { }

  public openWebSocket() {
    try {
      this.webSocket = new WebSocket('ws://localhost:8080/notification');
      this.setupWebSocketHandlers();
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.handleReconnection();
    }
  }

  private setupWebSocketHandlers() {
    this.webSocket.onopen = (event) => {
      console.log('WebSocket connected successfully');
      this.reconnectAttempts = 0;
    };

    this.webSocket.onmessage = (event) => {
      try {
        const chatMessageDto = JSON.parse(event.data);
        this.chatMessages.push(chatMessageDto);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    this.webSocket.onclose = (event) => {
      console.log('WebSocket connection closed');
      this.handleReconnection();
    };

    this.webSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      setTimeout(() => {
        this.openWebSocket();
      }, 3000);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  public sendMessage(chatMessage: ChatMessage) {
    if (this.webSocket?.readyState === WebSocket.OPEN) {
      this.webSocket.send(JSON.stringify(chatMessage));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  public closeWebSocket() {
    if (this.webSocket) {
      this.webSocket.close();
    }
  }
}