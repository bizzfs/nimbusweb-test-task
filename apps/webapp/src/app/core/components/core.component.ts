import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-core',
  template: '<div>Hi</div><router-outlet></router-outlet>shit',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent {}
