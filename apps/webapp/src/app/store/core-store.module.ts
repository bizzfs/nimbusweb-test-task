import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppEffects } from './effects/app.effects';
import { reducer } from './reducers/reducer';
import { NotesEffects } from './effects/notes.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducer, { runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),
    EffectsModule.forRoot([AppEffects, NotesEffects]),
    StoreDevtoolsModule.instrument(),
  ],
})
export class CoreStoreModule {}
