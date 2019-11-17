import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GameStore } from 'src/app/core/services/store/game.store';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'src/app/core/services/store/stores';
import { Subject } from 'rxjs';
import { Configuration } from 'src/app/app.constants';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  game: Game;
  current: number;
  solved: number;
  private unsubscribe: Subject<void> = new Subject();
  questions: number[];
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

    // init round questions
    this.questions = [];
    this.reset();
    // add questions
    for (let i = 1; i <= this.configuration.GalleryQuestions; i++) {
      this.questions.push(i);
    }

    this.answerAudio = new Audio('./assets/sounds/answer-correct.mp3');
    this.answerAudio.load();
  }

  public correct(): void {
    this.answerAudio.currentTime = 0;
    this.answerAudio.play();
    this.game.selectedPlayer.secondsLeft += this.configuration.GallerySeconds;
    if (this.current <= this.configuration.GalleryQuestions) {
      this.current++;
    }
    this.solved++;
  }

  public incorrect(): void {
    this.current++;
  }

  public reset(): void {
    this.current = 1;
    this.solved = 0;
  }

  public get secondsDiff(): string {
    if (this.solved >= this.configuration.GalleryQuestions) {
      return 'well done';
    }
    return `+ ${this.configuration.GallerySeconds}`;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
