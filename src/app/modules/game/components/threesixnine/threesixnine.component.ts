import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GameStore } from 'src/app/core/services/store/game.store';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'src/app/core/services/store/stores';
import { Subject } from 'rxjs';
import { Configuration } from 'src/app/app.constants';

@Component({
  selector: 'app-three-six-nine',
  templateUrl: './threesixnine.component.html',
  styleUrls: ['./threesixnine.component.scss']
})
export class ThreeSixNineComponent implements OnInit, OnDestroy {

  game: Game;
  current: number;
  private unsubscribe: Subject<void> = new Subject();
  questions: number[];
  private starter: number;
  private answerAudio: HTMLAudioElement;

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
        if (this.game !== null) {
          this.starter = this.game.selected;
        }
      });

    // init round questions
    this.questions = [];
    this.current = 1;
    // add questions
    for (let i = 1; i <= this.configuration.ThreeSixNineQuestions; i++) {
      this.questions.push(i);
    }

    this.answerAudio = new Audio('./assets/sounds/answer-correct.mp3');
    this.answerAudio.load();
  }

  public correct(): void {
    if (this.current % 3 === 0) {
      this.answerAudio.currentTime = 0;
      this.answerAudio.play();
      this.game.selectedPlayer.secondsLeft += this.configuration.ThreeSixNineSeconds;
      this.gameStore.save(this.game);
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

  public get secondsDiff(): string {
    if (this.current % 3 === 0) {
      return `+ ${this.configuration.ThreeSixNineSeconds}`;
    }
    return 'voor de eer';
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
