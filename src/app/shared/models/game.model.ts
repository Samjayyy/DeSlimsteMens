import { Player } from './player.model';

export class Game {
    public players: Player[];
    public selected: number;

    constructor() {
        this.selected = 0;
    }

    public static fromPlayers(players: Player[]) {
        const game = new Game();
        game.players = players;
        players.forEach(p => p.selected = false);
        game.selectedPlayer.selected = true;
        return game;
    }

    public get selectedPlayer(): Player {
        if (!this.players[this.selected]) {
            return null;
        }
        return this.players[this.selected];
    }

    public previous() {
        this.selectedPlayer.selected = false;
        this.selected--;
        if (this.selected < 0) {
            this.selected = this.players.length - 1;
        }
        this.selectedPlayer.selected = true;
    }

    public next() {
        this.selectedPlayer.selected = false;
        this.selected++;
        if (this.selected >= this.players.length) {
            this.selected = 0;
        }
        this.selectedPlayer.selected = true;
    }
}
