import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'rss-ui-kit/menu/src/menu.types';

import { RippleModule } from 'rss-ui-kit/ripple';
import { ButtonModule } from 'rss-ui-kit/button';
import { InputTextModule } from 'rss-ui-kit/inputtext';
import { InputIconModule } from 'rss-ui-kit/inputicon';
import { IconFieldModule } from 'rss-ui-kit/iconfield';
import { FloatLabelModule } from 'rss-ui-kit/floatlabel';
import { PasswordModule } from 'rss-ui-kit/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'rss-ui-kit/message';
import { ToastModule, ToastService } from 'rss-ui-kit/toast';
import { DatePickerModule } from 'rss-ui-kit/datepicker';
import { DrawerModule } from 'rss-ui-kit/drawer';
import { MenuModule } from 'rss-ui-kit/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    ButtonModule,
    RippleModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    FloatLabelModule,
    PasswordModule,
    ReactiveFormsModule,
    MessageModule,
    // NgIf,
    // RouterLink,
    ToastModule,
    FormsModule,
    DatePickerModule,
    DrawerModule,
    MenuModule,
  ],
  standalone: true,
})
export class AppComponent implements OnInit {
  public formGroup = new FormGroup({
    date: new FormControl('', { validators: [Validators.required] }),
  });

  public selectedDate: string | null = null;
  public singleDate: Date | null = null;
  public multipleDates: (Date | null)[] = [];
  public rangeDates: (Date | null)[] = [];

  public minDate = new Date('2025-01-01');
  public maxDate = new Date();

  public drawerVisible = true;

  public menuModel: MenuItem[] = [
    { label: 'Home', icon: 'rss-icon rss-home', disabled: false, routerLink: '/bkro' },
    { label: 'Search', icon: 'rss-icon rss-search', routerLink: '/search' },
    { label: '404', icon: 'rss-icon rss-cross', routerLink: '/404' },
    { separator: true },
    {
      label: 'Profile',
      target: '_blank',
      children: [
        {
          label: 'Logout',
          icon: 'rss-icon rss-chevronright',
          routerLink: '/logout',
          callback: (): void => {
            console.log('Logout');
          },
        },
        {
          label: 'Switch Theme',
          icon: 'rss-icon rss-home',
          title: 'Switch Theme',
          callback: (): void => {
            this.toggleTheme();
          },
        },
      ],
    },
    { separator: true },
    { label: 'Notifications', icon: 'rss-icon rss-envelope', routerLink: '/' },
    { label: 'Todo', icon: 'rss-icon rss-calendar', routerLink: '/' },
  ];

  private toastService = inject(ToastService);

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
    this.formGroup.controls.date.markAsTouched();
    this.formGroup.controls.date.markAsDirty();
    this.formGroup.controls.date.updateValueAndValidity();
    if (this.formGroup.invalid) {
      return;
    }

    console.log(this.formGroup.value);
  }

  public onDateChange(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.selectedDate = event.target.value;
      console.log(event.target.value);
    }
  }
}
