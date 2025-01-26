import { Component, Input } from '@angular/core';
import { Player } from '../../../model/players';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-details',
  imports: [CommonModule],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss'
})
export class PlayerDetailsComponent {
  @Input({required: true}) player!: Player;

}
