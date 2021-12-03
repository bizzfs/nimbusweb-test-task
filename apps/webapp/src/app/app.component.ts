import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-core></app-core>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
