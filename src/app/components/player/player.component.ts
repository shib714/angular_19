import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { Component, HostBinding, inject, Input } from '@angular/core';

import { PlayerDetailsComponent } from './player-details/player-details.component';
import { Player } from '../../model/players';
import { enterLeaveAnimation } from './animations';

@Component({
  selector: 'app-player',
  imports: [NgOptimizedImage, CommonModule, OverlayModule, PlayerDetailsComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  animations: [
    enterLeaveAnimation
  ],
})
export class PlayerComponent {
  @Input({required: true}) player!: Player;
  @HostBinding('@enterLeaveAnimation') animate = true;
  protected detailsOpen = false;

  private overlay = inject(Overlay);
  protected scrollStrategy = this.overlay.scrollStrategies.reposition();
  // protected scrollStrategy = this.overlay.scrollStrategies.block();
  // protected scrollStrategy = this.overlay.scrollStrategies.close();
  // protected scrollStrategy = this.overlay.scrollStrategies.noop();



}
