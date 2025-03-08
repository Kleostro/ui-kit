import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  public ngOnInit(): void {
    if (globalThis.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('rss-dark');
    } else {
      document.body.classList.add('rss-light');
    }
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
