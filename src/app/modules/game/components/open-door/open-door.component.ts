import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GameStore } from 'src/app/core/services/store/game.store';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'src/app/core/services/store/stores';
import { Subject } from 'rxjs';
import { Configuration } from 'src/app/app.constants';

@Component({
  selector: 'app-open-door',
  templateUrl: './open-door.component.html',
  styleUrls: ['./open-door.component.scss']
})
export class OpenDoorComponent implements OnInit, OnDestroy {

  game: Game;
  current: number;
  private unsubscribe: Subject<void> = new Subject();
  answers: number[];
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
      });

    // init round answsers
    this.answers = [];
    this.reset();
    // add questions
    for (let i = 1; i <= this.configuration.OpenDoorAnswers; i++) {
      this.answers.push(i);
    }

    this.answerAudio = new Audio('./assets/sounds/answer-correct.mp3');
    this.answerAudio.load();
  }

  public correct(): void {
    this.answerAudio.currentTime = 0;
    this.answerAudio.play();
    this.game.selectedPlayer.secondsLeft += this.configuration.OpenDoorSeconds;
    this.current++;
  }

  public reset(): void {
    this.current = 0;
  }

  public get secondsDiff(): string {
    if (this.current >= this.configuration.OpenDoorAnswers) {
      return 'well done';
    }
    return `+ ${this.configuration.OpenDoorSeconds}`;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
