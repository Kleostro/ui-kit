import { Component, Input } from '@angular/core';

@Component({
  selector: 'rss-inputicon',
  templateUrl: './inputicon.component.html',
  host: { class: 'rss-inputicon' },
  standalone: false,
})
export class InputIconComponent {
  @Input() public icon?: string;
}
