import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Configuration {
    public readonly StartSeconds = 60;
    public readonly ThreeSixNineSeconds = 10;
    public readonly MaxNumberOfPlayers = 4;
    public readonly ThreeSixNineQuestions = 15;
    public readonly OpenDoorAnswers = 4;
    public readonly OpenDoorSeconds = 20;
    public readonly PuzzleAnswers = 3;
    public readonly PuzzleSeconds = 30;
    public readonly GalleryQuestions = 10;
    public readonly GallerySeconds = 15;
    public readonly CollectiveMemoryAnswers = 5;
    public readonly CollectiveMemorySeconds = 10;
    public readonly FinalsAnswers = 5;
    public readonly FinalsSeconds = 20;
}
