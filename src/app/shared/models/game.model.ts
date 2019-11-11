import { Player } from './player.model';

export class Game {
    constructor(players: Player[]) {
        this.players = players;
        this.selected = 0;
        this.selectedPlayer.selected = true;
    }
    public players: Player[];
    public selected: number;
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
