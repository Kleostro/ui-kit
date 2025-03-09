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
    this.startRaf(messageWithId);
  }

  public add(message: ToastItem): void {
    const currentMessages = this.messagesSource.value;
    console.log(currentMessages);

    const messageWithId = this.addIdForMessage(message);
    this.messagesSource.next([...currentMessages, messageWithId]);

    this.startRaf(message);
  }

  public addAll(messages: ToastItem[]): void {
    const currentMessages = this.messagesSource.value;

    const messagesWithId = messages.map((message) => this.addIdForMessage(message));
    this.messagesSource.next([...currentMessages, ...messagesWithId]);

    for (const message of messagesWithId) {
      this.startRaf(message);
    }
  }

  public removeMessage(messageToRemove: ToastItem): void {
    const updatedMessages = this.messagesSource.value.filter((message) => message.id !== messageToRemove.id);
    this.messagesSource.next(updatedMessages);
  }

  private startRaf(message: ToastItem): void {
    if (!message.life || message.life <= 0) {
      return;
    }

    const startTime = Date.now();
    const duration = message.life;

    const animate = (): void => {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime >= duration) {
        this.removeMessage(message);
        return;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  private addIdForMessage(message: ToastItem): ToastItem {
    const id = crypto.randomUUID();
    return { ...message, id };
  }

  public clear(): void {
    this.messagesSource.next([]);
  }
}
