import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { timer, Subject, fromEvent } from 'rxjs';
import { Player } from 'src/app/shared/models/player.model';
import { takeUntil, filter, map } from 'rxjs/operators';
import { Game } from 'src/app/shared/models/game.model';
import { GameStore } from 'src/app/core/services/store/game.store';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss']
})
export class GameControlsComponent implements OnInit, OnDestroy {

  @Input()
  public game: Game;

  public possibleSeconds: number[];

  progress: boolean;
  private countAudio: HTMLAudioElement;
  private countDone: HTMLAudioElement;
  private playerDead: HTMLAudioElement;
  private answerAudio: HTMLAudioElement;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private gameStore: GameStore) {
    this.progress = false;
  }

  ngOnInit() {
    timer(0, 1000)
      .pipe(
        takeUntil(this.unsubscribe),
        filter(() => this.progress && this.game.selectedPlayer.secondsLeft > 0)
      )
      .subscribe(() => {
        this.game.selectedPlayer.secondsLeft--;
        if (this.game.selectedPlayer.secondsLeft <= 0) {
          this.startStop();
        }
      });
    this.countAudio = new Audio('./assets/sounds/countdown.mp3');
    this.countAudio.load();
    this.countAudio.loop = true;
    this.countDone = new Audio('./assets/sounds/countdown-pause.mp3');
    this.countDone.load();
    this.playerDead = new Audio('./assets/sounds/countdown-complete.mp3');
    this.playerDead.load();
    this.answerAudio = new Audio('./assets/sounds/answer-correct.mp3');
    this.answerAudio.load();

    fromEvent(document.body, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe),
        map((e: KeyboardEvent) => typeof (e.key) !== 'undefined' ? e.key : String.fromCharCode(e.keyCode)),
        map((text: string) => text.toUpperCase()),
      )
      .subscribe((code: string) => {
        switch (code) {
          case 'S':
          case ' ':
            this.startStop();
            break;
          case '4':
          case 'ARROWLEFT':
            this.previous();
            break;
          case '6':
          case 'ARROWRIGHT':
            this.next();
            break;
        }
      });
  }

  public stop(): boolean {
    if (!this.progress) {
      return;
    }
    this.startStop();
  }

  public startStop(): boolean {
    if (this.progress) {
      this.countAudio.pause();
      if (this.game.selectedPlayer.secondsLeft === 0) {
        this.countDone.currentTime = 0;
        this.playerDead.play();
      } else {
        this.countDone.currentTime = 0;
        this.countDone.play();
      }
    } else {
      if (this.game.selectedPlayer.secondsLeft <= 0) {
        return false;
      }
      this.countAudio.currentTime = 0;
      this.countAudio.play();
    }
    this.progress = !this.progress;
    return true;
  }

  public previous(): void {
    this.game.previous();
  }

  public next(): void {
    this.game.next();
  }

  public addSeconds(seconds: number, player?: Player): void {
    this.answerAudio.currentTime = 0;
    this.answerAudio.play();
    player = player || this.game.selectedPlayer;
    if (player.secondsLeft + seconds <= 0) {
      this.progress = false;
      this.countAudio.pause();
      player.secondsLeft = 0;
      this.playerDead.play();
      this.gameStore.save(this.game);
      return;
    }
    player.secondsLeft += seconds;
    this.gameStore.save(this.game);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
