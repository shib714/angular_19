import { ChangeDetectorRef, Component, computed, DestroyRef, effect, ElementRef, QueryList, Signal, signal, viewChild, ViewChild, viewChildren, ViewChildren } from '@angular/core';
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
//source: https://briantree.se/viewchild-and-viewchildren-signal-queries/
export class PlayerSearchComponent {
  protected players = players;
  protected searchText = signal('');
  protected search = new FormControl<string>('');
  protected filteredPlayers = computed(() => this.players.filter(p => p.name.toLowerCase().includes(this.searchText().toLowerCase())));
  //protected playerComponentsCount: number = 0;

  //Let’s switch this @ViewChild and update it to use signals
  //therefore instead of using the ngAfterViewInit lifecycle hook, 
  // we’ll use the new effect function within the constructor 
  // which allows us to react to signal value changes
  //@ViewChild('searchField') private searchField?: ElementRef<HTMLInputElement>;
  private searchField = viewChild<ElementRef<HTMLInputElement>>('searchField');

  //@ViewChildren(PlayerComponent) private playerComponents?: QueryList<PlayerComponent>;
  private playerComponents = viewChildren(PlayerComponent);
  //With this conversion, rather than use the function with the whole observable subscription, 
  // we can use a new concept where we create a signal from another signal
  //let’s change the “playerComponentsCount” property to use the new computed function.
  //so, whenever the viewChildren signal is updated, its value will trigger this signal to update with its new length
  //And this means we can remove the “updatePlayerComponentsCount” function, 
  // the ngAfterViewInit function and its imports, the takeUntilDestroyed function, the DestroyRef, and the ChangeDetectorRef too
  protected playerComponentsCount: Signal<number> = computed(() => this.playerComponents().length);

  constructor(private destroyRef: DestroyRef, private changeDetectorRef: ChangeDetectorRef) {
    //with this change, we’d see that the search field gets focused when initialized just like we want
    //note, this change doesn't update the playerComponentsCount, as it's not a signal
    //we will need to convert it to a signal to update the playerComponentsCount
    effect(() => {
      this.searchField()?.nativeElement.focus();
  });
  }

  // ngAfterViewInit() {
  //   //this.searchField?.nativeElement.focus();
  //   this.updatePlayerComponentsCount();
  // }

  // private updatePlayerComponentsCount() {
  //   this.playerComponentsCount = this.playerComponents?.length ?? 0;
  //   this.playerComponents?.changes.pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe(components => { 
  //       this.playerComponentsCount = components.length;
  //       this.changeDetectorRef.detectChanges();
  //     });
  // }
}