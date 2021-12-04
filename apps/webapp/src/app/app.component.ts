import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-core></app-core>',
  styles: [':host { display: block; width: 100%; height: 100% }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
