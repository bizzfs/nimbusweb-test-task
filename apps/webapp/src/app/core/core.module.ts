import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppInitializerService, initializeApp } from './services/app-initializer.service';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './components/core.component';
import { NotesComponent } from './components/notes.component';
import { SessionsService } from './services/sessions.service';
import { NotesService } from './services/notes.service';

@NgModule({
  imports: [CommonModule, CoreRoutingModule],
  declarations: [CoreComponent, NotesComponent],
  exports: [CoreComponent],
  providers: [
    AppInitializerService,
    SessionsService,
    NotesService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializerService],
      multi: true,
    },
  ],
})
export class CoreModule {}
