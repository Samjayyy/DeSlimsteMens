import { Component, OnInit, OnDestroy } from '@angular/core';
import { Game } from 'src/app/shared/models/game.model';
import { GameStore } from 'src/app/core/services/store/game.store';
import { Subject } from 'rxjs';
import { Player } from 'src/app/shared/models/player.model';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/app.constants';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();
  players: Player[];
  filteredPlayers: Player[];
  game: Game;
  playerscount: number;

  constructor(
    private gameStore: GameStore,
    private configuration: Configuration,
    private router: Router
  ) {
    this.playerscount = 3; // most common setting
    this.players = [];
    for (let i = 0; i < this.configuration.MaxNumberOfPlayers; i++) {
      this.players.push(new Player());
    }
    this.refreshFilteredPlayers();
  }

  ngOnInit() {
  }

  refreshFilteredPlayers(): void {
    this.filteredPlayers = this.players.slice(0, this.playerscount);
  }

  createGame(): boolean {
    for (const player of this.filteredPlayers) {
      if (!player.name
        || player.name.length < 1) {
        return false;
      }
      player.secondsLeft = this.configuration.StartSeconds;
      player.selected = false;
    }
    const game = new Game(this.filteredPlayers);
    this.gameStore.next(game);
    this.router.navigate(['/intro']);
    return true;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
