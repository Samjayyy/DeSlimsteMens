import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { Player } from 'src/app/shared/models/player.model';
import { GameStore } from 'src/app/core/services/store/game.store';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'src/app/core/services/store/stores';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-three-six-nine',
  templateUrl: './threesixnine.component.html',
  styleUrls: ['./threesixnine.component.scss']
})
export class ThreeSixNineComponent implements OnInit, OnDestroy {

  game: Game;
  current: number;
  private unsubscribe: Subject<void> = new Subject();
  private readonly noOfQuestions = 15;
  private readonly secondsForCorrect = 30;
  questions: number[];
  private starter: number;

  constructor(private gameStore: GameStore) {
  }

  ngOnInit() {
    // get the game
    this.gameStore
      .store$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((store: Store<Game>) => {
        this.game = store.data;
        if (this.game !== null) {
          this.starter = this.game.selected;
        }
      });

    // init round questions
    this.questions = [];
    this.current = 1;
    // add questions
    for (let i = 1; i <= this.noOfQuestions; i++) {
      this.questions.push(i);
    }

  }

  public correct(): void {
    if (this.current % 3 === 0) {
      this.game.selectedPlayer.secondsLeft += this.secondsForCorrect;
    }
    this.current++;
    this.starter = this.game.selected;
  }

  public incorrect(): void {
    this.game.next();
    if (this.starter === this.game.selected) {
      this.current++;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
