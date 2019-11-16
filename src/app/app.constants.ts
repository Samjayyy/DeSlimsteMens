import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Configuration {
    public readonly StartSeconds = 60;
    public readonly ThreeSixNineSeconds = 10;
    public readonly MaxNumberOfPlayers = 4;
    public readonly ThreeSixNineQuestions = 15;
}
