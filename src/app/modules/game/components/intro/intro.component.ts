import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GameStore } from 'src/app/core/services/store/game.store';
import { takeUntil } from 'rxjs/operators';
import { Store } from 'src/app/core/services/store/stores';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit, OnDestroy {

  game: Game;
  private unsubscribe: Subject<void> = new Subject();
  private introAudio: HTMLAudioElement;

  constructor(
    private gameStore: GameStore,
    private router: Router
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

    // load audio
    this.introAudio = new Audio('./assets/sounds/intro.mp3');
    this.introAudio.load();
    this.introAudio.play();
  }

  public skipIntro(): void {
    this.introAudio.pause();
    this.router.navigate(['/3-6-9']);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
