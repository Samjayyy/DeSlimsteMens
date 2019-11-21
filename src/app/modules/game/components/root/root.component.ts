import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { GameStore } from 'src/app/core/services/store/game.store';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  constructor(private gameStore: GameStore) { }

  ngOnInit() {
    this.gameStore.refreshFromLocalStorage();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
