import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from './components/root/root.component';
import { FormsModule } from '@angular/forms';
import { GameRoutingModule } from './game-routing.module';
import { StoreFeedbackComponent } from './components/storefeedback/storefeedback.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThreeSixNineComponent } from './components/threesixnine/threesixnine.component';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { IntroComponent } from './components/intro/intro.component';

@NgModule({
  declarations: [
    RootComponent,
    StoreFeedbackComponent,
    CountdownComponent,
    ThreeSixNineComponent,
    GameControlsComponent,
    CreateGameComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    GameRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [RootComponent],
  entryComponents: []
})
export class GameModule {
}
