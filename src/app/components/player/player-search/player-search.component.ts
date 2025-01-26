import { ChangeDetectorRef, Component, computed, DestroyRef, ElementRef, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { players } from '../../../model/players';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlayerComponent } from '../player.component';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-player-search',
  imports: [CommonModule, PlayerComponent, FormsModule, CdkScrollable, ReactiveFormsModule],
  templateUrl: './player-search.component.html',
  styleUrl: './player-search.component.scss'
})
export class PlayerSearchComponent {
  protected players = players;
  protected searchText = signal('');
  protected search = new FormControl<string>('');
  protected filteredPlayers = computed(() => this.players.filter(p => p.name.toLowerCase().includes(this.searchText().toLowerCase())));
  protected playerComponentsCount: number = 0;
  @ViewChild('searchField') private searchField?: ElementRef<HTMLInputElement>;
  @ViewChildren(PlayerComponent) private playerComponents?: QueryList<PlayerComponent>;

  constructor(private destroyRef: DestroyRef, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.searchField?.nativeElement.focus();
    this.updatePlayerComponentsCount();
  }

  private updatePlayerComponentsCount() {
    this.playerComponentsCount = this.playerComponents?.length ?? 0;
    this.playerComponents?.changes.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(components => { 
        this.playerComponentsCount = components.length;
        this.changeDetectorRef.detectChanges();
      });
  }
}