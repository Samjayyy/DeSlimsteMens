import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GameStore } from 'src/app/core/services/store/game.store';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'src/app/core/services/store/stores';
import { Subject } from 'rxjs';
import { Configuration } from 'src/app/app.constants';
import { GameControlsComponent } from '../game-controls/game-controls.component';

@Component({
  selector: 'app-collective-memory',
  templateUrl: './collective-memory.component.html',
  styleUrls: ['./collective-memory.component.scss']
})
export class CollectiveMemoryComponent implements OnInit, OnDestroy {

  @ViewChild('gamecontrols', { static: false })
  private gameControls: GameControlsComponent;

  game: Game;
  current: number;
  private unsubscribe: Subject<void> = new Subject();
  answers: number[];

  constructor(
    private gameStore: GameStore,
  ) { }

  ngOnInit() {
    // get the game
    this.gameStore
      .store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((store: Store<Game>) => {
        this.game = store.data;
      });

    // init round answsers
    this.answers = [];
    this.reset();
    // add questions
    for (let i = 1; i <= Configuration.CollectiveMemoryAnswers; i++) {
      this.answers.push(i);
    }
  }

  public correct(): void {
    if (this.current >= Configuration.CollectiveMemoryAnswers) {
      return;
    }
    ++this.current;
    this.gameControls.addSeconds(this.current * Configuration.CollectiveMemorySeconds);
    if (this.current === Configuration.CollectiveMemoryAnswers) {
      this.gameControls.stop();
    }
  }

  public reset(): void {
    this.current = 0;
  }

  public get secondsDiff(): string {
    if (this.current >= Configuration.CollectiveMemoryAnswers) {
      return 'well done';
    }
    return `+ ${(1 + this.current) * Configuration.CollectiveMemorySeconds}`;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
