import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesComponent } from './components/notes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/notes',
  },
  {
    path: 'notes',
    component: NotesComponent,
  },
  {
    path: '**',
    redirectTo: '/notes',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
