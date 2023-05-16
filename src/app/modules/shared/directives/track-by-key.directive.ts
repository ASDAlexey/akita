import { NgForOf } from '@angular/common';
import {
  Directive,
  Host,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';

// How use
// *ngFor="let item of items; trackByKey: 'data.entity.id'"
@Directive({ selector: '[ngForTrackByKey]' })
export class NgForTrackByKeyDirective implements OnChanges {
  @Input() ngForTrackByKey = '';

  constructor(
    @Host() @Optional() private ngFor: NgForOf<any[]>,
    private viewContainerRef: ViewContainerRef,
  ) {
    if (!ngFor) {
      throw new Error('trackByKey should use with *ngFor!');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('ngForTrackByKey' in changes) {
      const key = this.ngForTrackByKey;

      if (key) {
        this.ngFor.ngForTrackBy = (index: number, item: Object): string | number | undefined =>
          this.get(item, key);
      }

      this.ngFor['_differ'] = null;
      this.ngFor['_ngForOfDirty'] = true;
      this.viewContainerRef.clear();
      this.ngFor.ngDoCheck();
    }
  }

  private get(obj: Object, path: string): string | number | undefined {
    if (!path) {
      return undefined;
    }

    const pathArray = path.match(/([^.[\]])+/g);

    if (pathArray === null) {
      return undefined;
    }

    return pathArray.reduce((prevObj, key) => prevObj && prevObj[key as keyof Object], obj) as
      | string
      | number
      | undefined;
  }
}
