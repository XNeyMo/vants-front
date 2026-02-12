import { isDevMode } from '@angular/core';
import { TranslocoConfig, translocoConfig } from '@jsverse/transloco';

export const translocoConfigFactory = (): TranslocoConfig =>
  translocoConfig({
    availableLangs: ['en', 'es'],
    defaultLang: 'en',
    fallbackLang: 'en',
    reRenderOnLangChange: true,
    prodMode: !isDevMode()
  });
