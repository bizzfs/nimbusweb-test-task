import { FactoryProvider, InjectionToken, Injector } from '@angular/core';
import { WINDOW } from './window.providers';
import { Env } from './types';

export const ENV = new InjectionToken<Env>('EnvToken');

const envFactory = (injector: Injector) => {
  const window = injector.get(WINDOW) as Window & { __env: Env | undefined };
  if (window.__env == null) {
    throw new Error('No environment variables provided');
  }
  return { ...window.__env };
};

export const envProvider: FactoryProvider = {
  provide: ENV,
  useFactory: envFactory,
  deps: [Injector],
};
