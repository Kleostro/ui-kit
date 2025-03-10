import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'rss-ui-kit/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  public formGroup = new FormGroup({
    value: new FormControl('', { validators: [Validators.required] }),
  });

  constructor(private toastService: ToastService) {}

  public ngOnInit(): void {
    if (globalThis.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('rss-dark');
    } else {
      document.body.classList.add('rss-light');
    }
  }

  public showSuccess(): void {
    this.toastService.add({
      severity: 'success',
      icon: 'rss-icon rss-check',
      summary: 'Успешно!',
      detail: 'Операция завершена.',
    });
  }

  public showInfo(): void {
    this.toastService.add({
      severity: 'info',
      icon: 'rss-icon rss-user',
      summary: 'Информация',
      detail: 'Данные успешно обновлены.',
    });
  }

  public showError(): void {
    this.toastService.add({
      severity: 'danger',
      icon: 'rss-icon rss-trash',
      summary: 'Ошибка!',
      detail: 'Что-то пошло не так.',
    });
  }

  public showWarn(): void {
    this.toastService.add({
      severity: 'warn',
      icon: 'rss-icon rss-times',
      summary: 'Предупреждение',
      detail: 'Вы уверены?',
    });
  }

  public showSecondary(): void {
    this.toastService.add({
      severity: 'secondary',
      icon: 'rss-icon rss-user',
      summary: 'Вторичный',
      detail: 'Данные успешно обновлены.',
    });
  }

  public showContrast(): void {
    this.toastService.add({
      severity: 'contrast',
      summary: 'Контрастный',
      icon: 'rss-icon rss-user',
      detail: 'Данные успешно обновлены.',
      life: 2000,
    });
  }

  public clear(): void {
    this.toastService.clear();
  }

  public toggleTheme(): void {
    const isLight = document.body.classList.contains('rss-light');

    if (isLight) {
      document.body.classList.remove('rss-light');
      document.body.classList.add('rss-dark');
    } else {
      document.body.classList.remove('rss-dark');
      document.body.classList.add('rss-light');
    }
  }

  public onSubmit(): void {
    console.log(this.formGroup.value);
  }
}
