import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GameStore } from 'src/app/core/services/store/game.store';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'src/app/core/services/store/stores';
import { Subject } from 'rxjs';
import { Configuration } from 'src/app/app.constants';
import { GameControlsComponent } from '../game-controls/game-controls.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  @ViewChild('gamecontrols', { static: false })
  private gameControls: GameControlsComponent;

  game: Game;
  current: number;
  solved: number;
  private unsubscribe: Subject<void> = new Subject();
  questions: number[];

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

    // init round questions
    this.questions = [];
    this.reset();
    // add questions
    for (let i = 1; i <= Configuration.GalleryQuestions; i++) {
      this.questions.push(i);
    }
  }

  public correct(): void {
    if (this.solved >= Configuration.GalleryQuestions) {
      return;
    }
    this.next();
    this.gameControls.addSeconds(Configuration.GallerySeconds);
    if (++this.solved === Configuration.GalleryQuestions) {
      this.gameControls.stop();
    }
  }

  public incorrect(): void {
    this.next();
  }

  private next(): void {
    if (this.current <= Configuration.GalleryQuestions) {
      if (++this.current > Configuration.GalleryQuestions) {
        this.gameControls.stop();
      }
    }
  }

  public reset(): void {
    this.current = 1;
    this.solved = 0;
  }

  public get secondsDiff(): string {
    if (this.solved >= Configuration.GalleryQuestions) {
      return 'well done';
    }
    return `+ ${Configuration.GallerySeconds}`;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
