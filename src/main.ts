import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { GameModule } from './app/modules/game/game.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GameModule)
  .catch(err => console.error(err));
