import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-core',
  template: '<router-outlet></router-outlet>',
  styles: [':host { display: block; width: 100%; height: 100% }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent {}
