import { BehaviorSubject } from 'rxjs';
import { OperatorFunction, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Store<T> {
  isFetching: boolean;
  data: T;
  error?: string;
}

export abstract class StoreService<T> {
  private _store$ = new BehaviorSubject<Store<T>>(this.make());

  public get store$(): BehaviorSubject<Store<T>> {
    return this._store$;
  }

  public next(data: T = null, isFetching: boolean = false, error: string = null): void {
    this._store$.next(this.make(data, isFetching, error));
  }

  private make(data: T = null, isFetching: boolean = false, error: string = null): Store<T> {
    return {
      isFetching,
      data,
      error
    };
  }

  catchErrorAndReset(): OperatorFunction<any, any> {
    return catchError(err => {
      this.store$.next({
        ...this.store$.value,
        isFetching: false,
        error: err
      });
      return throwError(err);
    });
  }

  setStateFetching() {
    this.store$.next({
      ...this.store$.value,
      isFetching: true,
    });
  }
}

