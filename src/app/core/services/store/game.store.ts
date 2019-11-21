import { Injectable } from '@angular/core';
import { StoreService } from './stores';
import { Game } from 'src/app/shared/models/game.model';
import { plainToClass } from 'class-transformer';

@Injectable({ providedIn: 'root' })
export class GameStore extends StoreService<Game> {

    constructor() {
        super();
    }

    public refreshFromLocalStorage(): void {
        const data = localStorage.getItem('game');
        if (data !== null) {
            this.next(plainToClass(Game, JSON.parse(data)));
        }
    }

    public save(game: Game): void {
        localStorage.setItem('game', JSON.stringify(game));
    }


}
