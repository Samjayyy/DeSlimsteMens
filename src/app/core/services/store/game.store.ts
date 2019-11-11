import { Injectable } from '@angular/core';
import { StoreService } from './stores';
import { Game } from 'src/app/shared/models/game.model';

@Injectable({ providedIn: 'root' })
export class GameStore extends StoreService<Game> {

    constructor() {
        super();
    }


}
