import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastItem } from './toast.type';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messagesSource = new BehaviorSubject<ToastItem[]>([]);
  public messages$ = this.messagesSource.asObservable();

  public show(message: ToastItem): void {
    const messageWithId = this.addIdForMessage(message);
    this.messagesSource.next([messageWithId]);
  }

  public add(message: ToastItem): void {
    const currentMessages = this.messagesSource.value;

    const messageWithId = this.addIdForMessage(message);
    this.messagesSource.next([...currentMessages, messageWithId]);
  }

  public addMany(messages: ToastItem[]): void {
    const currentMessages = this.messagesSource.value;

    const messagesWithId = messages.map((message) => this.addIdForMessage(message));
    this.messagesSource.next([...currentMessages, ...messagesWithId]);
  }

  public removeMessage(messageToRemove: ToastItem): void {
    const updatedMessages = this.messagesSource.value.filter((message) => message.id !== messageToRemove.id);
    this.messagesSource.next(updatedMessages);
  }

  private addIdForMessage(message: ToastItem): ToastItem {
    const id = crypto.randomUUID();
    return { ...message, id, isDying: false };
  }

  public clear(): void {
    this.messagesSource.next([]);
  }
}
