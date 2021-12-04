import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppInitializerService, initializeApp } from './services/app-initializer.service';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './components/core.component';
import { NoteComponent } from './components/note/note.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotesService } from './services/notes.service';
import { SessionsService } from './services/sessions.service';
import { SearchComponent } from './components/search/search.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TagsComponent } from './components/tags/tags.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CoreRoutingModule],
  declarations: [
    CoreComponent,
    NotesComponent,
    SidebarComponent,
    SearchComponent,
    NotesListComponent,
    NoteComponent,
    TagsComponent,
  ],
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
