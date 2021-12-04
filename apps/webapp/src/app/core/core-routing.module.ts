import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InitialNavigationGuardService } from './services/initial-navigation-guard.service';
import { NotesComponent } from './components/notes/notes.component';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    canActivate: [InitialNavigationGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [InitialNavigationGuardService],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
