import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoreStoreModule } from './store/core-store.module';
import { envProvider } from './env.provider';
import { windowProviders } from './window.providers';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CoreStoreModule, CoreModule],
  providers: [windowProviders, envProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
