import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

// Observable abstraction over ngOnDestroy to use with takeUntil
// from https://github.com/TinkoffCreditSystems/taiga-ui/blob/main/projects/cdk/services/destroy.service.ts
/**
 * @note:
 * Observable abstraction over ngOnDestroy to use with takeUntil
 *
 * Why we use `ReplaySubject` instead of `Subject`?
 * Well, we’ll use ReplaySubject to emit the last message in case
 * the subscription is ended after the component is destroyed.
 */
@Injectable()
export class UnsubscribeService extends ReplaySubject<void> implements OnDestroy {
  constructor() {
    super(1);
  }

  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
