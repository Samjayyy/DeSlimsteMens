import { Component, Input } from '@angular/core';
import { Player } from 'src/app/shared/models/player.model';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent {

  @Input()
  public player: Player;

}
