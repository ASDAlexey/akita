import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { persistState } from '@datorama/akita';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

!environment.production && persistState();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
