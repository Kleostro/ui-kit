import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  public ngOnInit(): void {
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? document.body.classList.add('rss-dark')
      : document.body.classList.add('rss-light');
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
}
