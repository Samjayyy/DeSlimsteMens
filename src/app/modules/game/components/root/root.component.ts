import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { GameStore } from 'src/app/core/services/store/game.store';
import { Game } from 'src/app/shared/models/game.model';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'src/app/core/services/store/stores';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  private game: Game = null;

  constructor(private gameStore: GameStore) { }

  ngOnInit() {
    this.gameStore.refreshFromLocalStorage();
    this.gameStore
      .store$
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((store: Store<Game>) => {
        this.game = store.data;
      });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    // save the current game in either way locally
    if (this.game !== null) {
      this.gameStore.save(this.game);
    }
    $event.returnValue = true;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
