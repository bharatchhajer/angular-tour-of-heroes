import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = ["Hello"];
  constructor() { }

  addMessage(message:string): void {
    this.messages.push(message);
  }

  clearMessages(){
    this.messages = [];
  }
}
