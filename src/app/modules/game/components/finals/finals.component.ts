import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GameStore } from 'src/app/core/services/store/game.store';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'src/app/core/services/store/stores';
import { Subject } from 'rxjs';
import { Configuration } from 'src/app/app.constants';
import { Player } from 'src/app/shared/models/player.model';
import { GameControlsComponent } from '../game-controls/game-controls.component';

@Component({
  selector: 'app-finals',
  templateUrl: './finals.component.html',
  styleUrls: ['./finals.component.scss']
})
export class FinalsComponent implements OnInit, OnDestroy {

  @ViewChild('gamecontrols', { static: false })
  private gameControls: GameControlsComponent;

  game: Game;
  player1: Player = null;
  player2: Player = null;
  current: number;
  answers: number[];
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private gameStore: GameStore,
    private configuration: Configuration
  ) {
  }

  ngOnInit() {
    // get the game
    this.gameStore
      .store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((store: Store<Game>) => {
        this.game = store.data;
        if (this.game !== null
          && this.game.players !== null
          && this.game.players.length > 1) {
          for (const player of this.game.players) {
            if (this.player1 === null
              || this.player1.secondsLeft < player.secondsLeft) {
              this.player1 = player;
            }
          }
          for (const player of this.game.players) {
            if (this.player1 === player) {
              continue;
            }
            if (this.player2 === null
              || this.player2.secondsLeft < player.secondsLeft) {
              this.player2 = player;
            }
          }
          this.reset();
        }
      });

    // init round answsers
    this.answers = [];
    // add questions
    for (let i = 1; i <= this.configuration.FinalsAnswers; i++) {
      this.answers.push(i);
    }
  }

  public correct(): void {
    if (this.current >= this.answers.length) {
      return;
    }
    this.gameControls.addSeconds(-this.configuration.FinalsSeconds, this.otherPlayer);
    if (++this.current === this.answers.length) {
      this.gameControls.stop();
    }
  }

  public reset(): void {
    this.current = 0;
    if (this.game.selectedPlayer !== this.player1
      && this.game.selectedPlayer !== this.player2) {
      while (this.game.selectedPlayer !== this.player1) {
        this.game.next();
      }
    }
    if (this.game.selectedPlayer.secondsLeft > this.otherPlayer.secondsLeft) {
      const othPlayer = this.otherPlayer;
      while (this.game.selectedPlayer !== othPlayer) {
        this.game.next();
      }
    }
  }

  public get otherPlayer(): Player {
    return this.game.selectedPlayer === this.player1
      ? this.player2
      : this.player1;
  }

  public get secondsDiff(): string {
    if (this.current >= this.configuration.FinalsAnswers) {
      return 'well done';
    }
    return `- ${this.configuration.FinalsSeconds}`;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
