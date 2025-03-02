/* eslint-disable unicorn/prefer-top-level-await */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((error: unknown) => {
    console.error(error);
  });
